import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect, useState } from 'react';
import { IDashboardActionProps, ICollapsibleTableProps, IGroupedDashboard, IPieData, IDashboardModel, IDashboardContainerProps, IDashboardComponentProps, IDashboardSubModel, IDriverCondition } from '../models/dashboard';
import DashboardComponent from '../components/dashboard/DashboardComponent';
import { loadDashboard } from '../actions/DashboardActions';
import { groupBy } from '../utils/database';
import { IDatePickerProps } from '../models/datePicker';

const DashboardContainer = (props: IDashboardContainerProps & IDashboardActionProps) => {
    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No', 'Over Speed Count', 'Harsh Break Count', 'Harsh Turn Count'];
    const groupedDataByDriverId = groupBy(props.dashboard, 'DriverVehicleId') as IGroupedDashboard;
    const driverCondition = {
        includeHarshBrake: true,
        includeHarshTurn: true,
        includeOverSpeed: true
    } as IDriverCondition;
    const drivers = getWithSubModel(groupedDataByDriverId);
    const pieData = [
        { name: '0 - 50', value: 70, color: '#488f31' },
        { name: '50 - 60', value: 20, color: '#ffe03b' },
        { name: '60 - 120', value: 10, color: '#de3e16' },
    ] as IPieData[];

    const collapsibleTableProps = {
        data: drivers,
        headers,
        driverCondition
    } as ICollapsibleTableProps;

    const dateFormat = 'MM/dd/yyyy';
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(minDate);
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
        datePickerDateFormat: dateFormat,
        datePickerMinDate: minDate,
        datePickerMaxDate: currentDate,
        datePickerFromDate: fromDate ? fromDate : minDate,
        datePickerToDate: toDate ? toDate : currentDate,
        handleFromDateChange: (date: Date) => handleFromDateChange(date),
        handleToDateChange: (date: Date) => handleToDateChange(date)
    } as IDatePickerProps;

    const dashboardComponentProps = {
        graphData: pieData,
        tableData: collapsibleTableProps,
        datePicker: datePickerProps
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

export const getWithSubModel = (groupedData: IGroupedDashboard, speedLimit = 60): IDashboardModel[] => {
    let dashboard = [] as IDashboardModel[];

    for (let key in groupedData) {
        if (key) {
            let count = 0;
            const {
                DCS_DriverMaster: { DriverId, DriverMobile, DriverName },
                CreatedDate,
                DCS_VehicleMaster: { VehicleLicenseNo, VehicleName }
            } = groupedData[key][0];
            let dashboardModel = {
                DriverId,
                CreatedDate,
                DriverMobile,
                DriverName,
                VehicleLicenseNo,
                VehicleName,
                OverSpeed: 0,
                HarshBreaking: 0,
                HarshTurning: 0,
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
    return 'HarshTurning' in object;
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
