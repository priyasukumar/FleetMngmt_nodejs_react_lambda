import * as React from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverSpeedComponent from '../components/dashboard/OverSpeedComponent';
import { IGroupedDashboard, ICollapsibleTableProps, IDriverCondition, IDashboardModel, IRangeFilterModelProps } from '../models/dashboard';
import { useState, useEffect } from 'react';
import { IOverSpeedComponentProps, IOverSpeedContainerProps, IOverSpeedActionProps } from '../models/overSpeed';
import { IDiscreteSliderProps } from '../components/shared/DiscreteSliderComponent';
import { groupBy } from '../utils/database';
import { getWithSubModel } from './DashboardContainer';
import { IDatePickerProps } from '../models/datePicker';
import { isoToLocal } from '../utils/date';
import { loadOverSpeed } from '../actions/OverSpeedActions';
import { getBarData, sortBy } from '../utils/driver';
import { Driver } from '../constants/enum';
import { IBarComponentProps } from '../models/graph';

const OverSpeedContainer = (props: IOverSpeedContainerProps & IOverSpeedActionProps) => {
    const dateFormat = 'DD/MM/YYYY';
    const [speedLimit, onSpeedLimitChange] = useState(80);
    const [toSpeedLimit, onRangeFilterChange] = useState(200);
    const [rangeFilterApplied, setRangeFilterApplied] = useState(false);

    const rangeFilter = {
        rangeFilter: [
            { id: 1, displayText: '0 - 10', from: 0, to: 10},
            { id: 2, displayText: '11 - 20', from: 11, to: 20},
            { id: 3, displayText: '21 - 30', from: 21, to: 30},
            { id: 4, displayText: '31 - 40', from: 31, to: 40},
            { id: 5, displayText: '41 - 50', from: 41, to: 50},
            { id: 5, displayText: '51 - 60', from: 21, to: 60},
            { id: 6, displayText: '61 - 70', from: 61, to: 70},
            { id: 6, displayText: '71 - 80', from: 71, to: 80},
            { id: 7, displayText: '81 - 90', from: 81, to: 90},
            { id: 8, displayText: '91 - 100', from: 91, to: 100},
            { id: 8, displayText: '101 - 110', from: 101, to: 110},
            { id: 8, displayText: '111 - 120', from: 111, to: 120},
      ],
      handleRangeFilterChange: onRangeChange,
    } as IRangeFilterModelProps;

    function onRangeChange(e: any) {
        if(e.target.value === 'Reset')
        {
            setRangeFilterApplied(false);
            onRangeFilterChange(120);
        }
        else
        {
            onRangeFilterChange(e.target.value);
            setRangeFilterApplied(true);
        }
    }

    let fromSpeedLimit = 0;
    if(toSpeedLimit !== 200)
    {
        fromSpeedLimit = toSpeedLimit-9;
    }

    const discreteSliderProps = {
        title: 'Speed Limit',
        min: 0,
        max: 120,
        speedLimit: speedLimit,
        onSliderChange: (limit: number) => onSpeedLimitChange(limit),
    } as IDiscreteSliderProps;
    const groupedDataByDriverId = groupBy(props.overSpeed, 'DriverVehicleId') as IGroupedDashboard;
    const overSpeed = getWithSubModel(groupedDataByDriverId, speedLimit).filter(c => c.OverSpeed > 0 &&(c.OverSpeed >= (rangeFilterApplied? fromSpeedLimit:0) && c.OverSpeed <= toSpeedLimit)).filter(c => c.SubModel = c.SubModel.filter(d => d.VehicleSpeed >= speedLimit));
    const overSpeedWithLeastData = getWithSubModel(groupedDataByDriverId, speedLimit);
    
    const headers = [
        { columnName: 'DriverId', columnValue: 'Driver Id' },
        { columnName: 'DriverName', columnValue: 'Driver Name' },
        { columnName: 'DriverMobile', columnValue: 'Driver Mobile' },
        { columnName: 'VehicleName', columnValue: 'Vehicle Name' },
        { columnName: 'VehicleLicenseNo', columnValue: 'Vehicle License No' },
        { columnName: 'OverSpeed', columnValue: 'Over Speed Count' },
      ];

    const driverCondition = {
        includeHarshBrake: false,
        includeHarshTurn: false,
        includeOverSpeed: true
    } as IDriverCondition;

    const datePickerFormat = 'dd/MM/yyyy';
    const dates = useSelector((store:any) => store.date) 
    const currentDateFromState = dates.currentDate
    const initialToDateFromState = dates.initialToDate;
    const minDate = new Date();
    const currentDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 3);
    const [fromDate, setFromDate] = useState<Date | null>(initialToDateFromState);
    const [toDate, setToDate] = useState<Date | null>(currentDateFromState);

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
        datePickerFromDate: fromDate ? fromDate : initialToDateFromState,
        datePickerToDate: toDate ? toDate : currentDateFromState,
        handleDateChange: (fromDate: Date, toDate: Date) => handleDateChange(fromDate, toDate)
    } as IDatePickerProps;

    const dashboardClone = JSON.parse(JSON.stringify(overSpeed)) as IDashboardModel[];
    dashboardClone.forEach(c => c.PacketTime = isoToLocal(c.PacketTime, dateFormat));
    const groupedDataByPacketTime = groupBy(dashboardClone, Driver.PacketTime) as IGroupedDashboard;
    const barData = getBarData(groupedDataByPacketTime, fromDate, toDate, dateFormat, Driver.OverSpeed);

    const collapsibleTableProps = {
        data: overSpeed,
        headers: headers,
        driverCondition,
        barData,
        rangeFilter: rangeFilter
    } as ICollapsibleTableProps;

    const mostCrossedOverSpeed = {
        title: 'Top Most Crossed',
        xaxisTitle: 'Driver Name',
        yaxisTitle: 'Over Speed Count',
        plot: sortBy(overSpeedWithLeastData, Driver.OverSpeed , 'desc'),
        barColor: '#e6601d'
    } as IBarComponentProps;

    const leastCrossedOverSpeed = {
        title: 'Top Least Crossed',
        xaxisTitle: 'Driver Name',
        yaxisTitle: 'Over Speed Count',
        plot: sortBy(overSpeedWithLeastData, Driver.OverSpeed),
        barColor: '#e6601d'
    } as IBarComponentProps;

    const overSpeedComponentProps = {
        leastCrossedDrivers: leastCrossedOverSpeed,
        mostCrossedrivers: mostCrossedOverSpeed,
        discreteSlider: discreteSliderProps,
        tableData: collapsibleTableProps,
        datePicker: datePickerProps
    } as IOverSpeedComponentProps;

    useEffect(
        () => {
            if (fromDate && toDate) {
                props.loadData(fromDate, toDate);
            }
        },
        [props.loadData]);

    return (
        <OverSpeedComponent {...overSpeedComponentProps} />
    );
};

const mapStateToProps = ({ overSpeed }: { overSpeed: IOverSpeedContainerProps }) => {
    return {
        overSpeed: overSpeed.overSpeed
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: (fromDate: Date, toDate: Date) => loadOverSpeed(fromDate, toDate),
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverSpeedContainer);