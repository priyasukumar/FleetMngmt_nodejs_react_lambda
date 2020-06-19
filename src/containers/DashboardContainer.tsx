import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import { IDashboardActionProps, ICollapsibleTableProps, IGroupedDashboard, IPieData,IScoreData,IServiceReminder, IDashboardModel, IDashboardContainerProps, IDashboardComponentProps, IDashboardSubModel, IDriverCondition } from '../models/dashboard';
import DashboardComponent from '../components/dashboard/DashboardComponent';
import { loadDashboard } from '../actions/DashboardActions';
import { groupBy } from '../utils/database';
import { IDatePickerProps } from '../models/datePicker';
import { Driver } from '../constants/enum';
import { scores} from '../utils/driver';
import { IBarComponentProps } from '../models/graph';
const DashboardContainer = (props: IDashboardContainerProps & IDashboardActionProps) => {
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
        { columnName: 'OverSpeed', columnValue: 'Over Speed Count' },
        { columnName: 'HarshBreaking', columnValue: 'Harsh Break Count' },
        { columnName: 'HarshTurning', columnValue: 'Harsh Turn Count' },
      ];
    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const driverCondition = {
        includeHarshBrake: true,
        includeHarshTurn: true,
        includeOverSpeed: true
    } as IDriverCondition;
    const drivers = getWithSubModel(groupedDataByDriverId);

    let overSpeed = 0, harshBreaking = 0, harshTurning = 0, servicenow = 0,servicelater=0 ,servicesoon=0;
        drivers.map(c => {
        if (c.OverSpeed > 0 ) {
            overSpeed += c.OverSpeed;
        }
        if (c.HarshBreaking > 0) {
            harshBreaking += c.HarshBreaking;
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
        if (c.HarshBreaking > 0) {
            c.Score += (c.HarshBreaking/harshBreaking)*100;
        }
        if (c.HarshTurning > 0) {
            c.Score += (c.HarshTurning/harshTurning)*100;
        }
        c.Score=(100-(
            c.Score%100))/10;
       if(c.Score>=9)
       {
           servicelater+=1;
       }
       else if(c.Score>=8)
       {
           servicesoon+=1;
       }
       else if(c.Score>=7)
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
        { name: 'Harsh Break', value: harshBreaking, color: '#aec7e8' },
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
    initialToDate.setDate(initialToDate.getDate() - 14);
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDate);
    const [toDate, setToDate] = useState<Date | null>(currentDate);
    const handleFromDateChange = (date: Date | null) => {
        if (date && toDate) {
            setFromDate(date);
            props.loadData(date, toDate);
        }
    };
    const handleToDateChange = (date: Date | null) => {
        if (date && fromDate) {
            setToDate(date);
            props.loadData(fromDate, date);
        }
    };

    const datePickerProps = {
        datePickerDateFormat: datePickerFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : initialToDate,
        datePickerToDate: toDate ? toDate : currentDate,
        handleFromDateChange: (date: Date) => handleFromDateChange(date),
        handleToDateChange: (date: Date) => handleToDateChange(date)
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
                HarshBreaking: 0,
                HarshTurning: 0,
                Score:0,
                SubModel: [] as IDashboardSubModel[]
            } as IDashboardModel;

            groupedData[key].reduce((c, p, index) => {
                dashboardModel.SubModel[index] = {
                    HarshBreaking: 0,
                    HarshTurning: 0,
                    PacketTime: '',
                    VehicleSpeed: 0
                } as IDashboardSubModel;
                dashboardModel.SubModel[index].VehicleSpeed = p.VehicleSpeed;
                dashboardModel.SubModel[index].PacketTime = p.PacketTime;
                dashboardModel.SubModel[index].HarshBreaking = p.HarshBreaking;
                dashboardModel.HarshBreaking = dashboardModel.HarshBreaking + c.HarshBreaking + p.HarshBreaking;
                dashboardModel.SubModel[index].HarshTurning = p.HarshTurning;
                dashboardModel.HarshTurning = dashboardModel.HarshBreaking + c.HarshTurning + p.HarshTurning;
                if (p.VehicleSpeed >= speedLimit) {
                    count += 1;
                }
                dashboardModel.OverSpeed = count;
                dashboardModel.Score=0;
                return c;
            }, {
                HarshBreaking: 0,
                HarshTurning: 0
            } as IDashboardModel);

            dashboard.push(dashboardModel);
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
