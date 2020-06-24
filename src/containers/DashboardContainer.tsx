import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import { IDashboardActionProps, ICollapsibleTableProps, IGroupedDashboard, IPieData,IScoreData,IServiceReminder, IDashboardModel, IDashboardContainerProps, IDashboardComponentProps, IDashboardSubModel, IDriverCondition,IDashboardDateFilterModel } from '../models/dashboard';
import DashboardComponent from '../components/dashboard/DashboardComponent';
import { loadDashboard } from '../actions/DashboardActions';
import { groupBy } from '../utils/database';
import { IDatePickerProps } from '../models/datePicker';
import { Driver } from '../constants/enum';
import { scores} from '../utils/driver';
import { IBarComponentProps } from '../models/graph';
import { isoToLocal } from '../utils/date';

const DashboardContainer = (props: IDashboardContainerProps & IDashboardActionProps) => {
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
        { columnName: 'OverSpeed', columnValue: 'Over Speed Count' },
        { columnName: 'HarshBraking', columnValue: 'Harsh Brake Count' },
        { columnName: 'HarshTurning', columnValue: 'Harsh Turn Count' },
      ];
    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const driverCondition = {
        includeHarshBrake: true,
        includeHarshTurn: true,
        includeOverSpeed: true
    } as IDriverCondition;
    const drivers = getWithSubModel(groupedDataByDriverId);

    let overSpeed = 0, harshBraking = 0, harshTurning = 0, servicenow = 0,servicelater=0 ,servicesoon=0;
        drivers.map(c => {
        if (c.OverSpeed > 0 ) {
            overSpeed += c.OverSpeed;
        }
        if (c.HarshBraking > 0) {
            harshBraking += c.HarshBraking;
        }
        if (c.HarshTurning > 0) {
            harshTurning += c.HarshTurning;
        }

        return c;
    });
    let scoreData = {
        name:'',
        value:0
        
        } as IScoreData;
    
    drivers.map(c => {
        if (c.OverSpeed > 0 ) {
            c.Score += (c.OverSpeed/overSpeed)*100;
        }
        if (c.HarshBraking > 0) {
            c.Score += (c.HarshBraking/harshBraking)*100;
        }
        if (c.HarshTurning > 0) {
            c.Score += (c.HarshTurning/harshTurning)*100;
        }
        c.Score=(100-(
            c.Score%100))/10;
       if(c.Score>=8.5)
       {
           servicelater+=1;
       }
       else if(c.Score>=8)
       {
           servicesoon+=1;
       }
       else if(c.Score>=7.5)
       {
           servicenow+=1;
       }
        if(c.Score>scoreData.value)
        {
            
            scoreData.value=(Number)(c.Score.toFixed(1));
            scoreData.name=c.DriverName;
            
        }
        return c;
    });

   
    const graphData = [
        { name: 'Over Speed', value: overSpeed, color: '#ff7f0e' },
        { name: 'Harsh Brake', value: harshBraking, color: '#aec7e8' },
        { name: 'Harsh Turn', value: harshTurning, color: '#1f77b4' },
    ] as IPieData[];

   

    const serviceReminder = [
     
        { name: 'IMMEDIATELY', value: servicenow,color:'red'},
        { name: 'SOON', value: servicesoon,color:'orange'},
        { name: 'LATER', value: servicelater,color:'green'}
       

    ] as IServiceReminder[];
   
    const collapsibleTableProps = {
        data: drivers,
        headers,
        driverCondition
    } as ICollapsibleTableProps;

    const datePickerFormat = 'dd/MM/yyyy';
    
    const currentDate = new Date();
    const initialToDate = new Date();
    initialToDate.setDate(initialToDate.getDate() - 10);
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDate);
    const [toDate, setToDate] = useState<Date | null>(currentDate);
    const handleDateChange = (fromDate: Date | null, toDate: Date | null) => {
        if (toDate && fromDate) {
            setToDate(toDate);
            setFromDate(fromDate);
            props.loadData(fromDate, toDate);
        }
    };

    const datePickerProps = {
        datePickerDateFormat: datePickerFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : initialToDate,
        datePickerToDate: toDate ? toDate : currentDate,
        handleDateChange: (fromDate: Date, toDate: Date) => handleDateChange(fromDate, toDate)
    } as IDatePickerProps;

    const driverScoreBoard = {
        title: 'DRIVERS SCORE BOARD',
        yaxisTitle: 'Scores',
        plot:  scores(drivers, 'Score','desc'),
        barColor: '#1f77b4'
    } as IBarComponentProps;

    const dashboardComponentProps = {
        graphData: graphData,
        tableData: collapsibleTableProps,
        datePicker: datePickerProps,
        scoreData: scoreData,
        driverScoreBoard:driverScoreBoard,
        serviceReminder: serviceReminder
    } as IDashboardComponentProps;

   
   
    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadData(fromDate, toDate);
            }
        },
        [props.loadData]);

    return (
        <DashboardComponent {...dashboardComponentProps} />
    );
};

export const getWithSubModel = (groupedData: IGroupedDashboard, speedLimit = 80): IDashboardModel[] => {
    let dashboard = [] as IDashboardModel[];
    const dateFormat = 'DD-MM-YYYY';
    let dashboardElemCount = 0;
    for (let key in groupedData) {
        if (key) {
            let count = 0;
            const {
                DCS_DriverMaster: { DriverId, DriverMobile, DriverName },
                CreatedDate,
                PacketTime,
                DCS_VehicleMaster: { VehicleLicenseNo, VehicleName }
            } = groupedData[key][0];
            let dashboardModel = {
                DriverId,
                CreatedDate,
                PacketTime,
                DriverMobile,
                DriverName,
                VehicleLicenseNo,
                VehicleName,
                OverSpeed: 0,
                HarshBraking: 0,
                HarshTurning: 0,
                Score:0,
                
                SubModel: [] as IDashboardSubModel[],
                DateFilterModel: {} as IDashboardDateFilterModel
            } as IDashboardModel;

            groupedData[key].reduce((c, p, index) => {
                dashboardModel.SubModel[index] = {
                    HarshBraking: 0,
                    HarshTurning: 0,
                    PacketTime: '',
                    VehicleSpeed: 0,
                    Date: '',
                } as IDashboardSubModel;
		        dashboardModel.SubModel[index].VehicleSpeed = p.VehicleSpeed;
                dashboardModel.SubModel[index].PacketTime = p.PacketTime;
                dashboardModel.SubModel[index].HarshBraking = p.HarshBreaking;
                dashboardModel.HarshBraking = dashboardModel.HarshBraking + p.HarshBreaking;
                dashboardModel.SubModel[index].HarshTurning = p.HarshTurning;
                dashboardModel.HarshTurning = dashboardModel.HarshTurning + p.HarshTurning;
                dashboardModel.SubModel[index].Date = isoToLocal(p.PacketTime,dateFormat);
                if (p.VehicleSpeed >= speedLimit) {
                    count += 1;
                }
                dashboardModel.OverSpeed = count;
                dashboardModel.Score=0;
                return c;
            }, {
                HarshBraking: 0,
                HarshTurning: 0
            } as IDashboardModel);
            
            dashboard.push(dashboardModel);
            dashboard[dashboardElemCount].DateFilterModel = {};
            dashboardElemCount += 1;
            count = 0;
        }
    }
    return dashboard;
};

export const isDashboard = (object: any): object is IDashboardModel => {
    if (object === undefined) {
        return false;
    }
    return Driver.HarshTurn in object;
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardContainerProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: (fromDate: Date, toDate: Date) => loadDashboard(fromDate, toDate),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
