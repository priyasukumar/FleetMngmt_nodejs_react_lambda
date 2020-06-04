import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { IDriverServiceTimeActionProps, IDriverServiceTimeContainerProps, IDriverServiceTimeComponentProps, IGroupedDriverServiceTime, IDriverServiceTimeModel, IDriverServiceTimeSubModel } from '../models/driverServiceTime';
import DriverServiceComponent from '../components/dashboard/DriverServiceComponent';
import { loadDriversServiceTime } from '../actions/DriverServiceTimeAction';
import { groupBy } from '../utils/database';
import { ICollapsibleTableProps } from '../models/dashboard';

const DriverServiceTimeContainer = (props: IDriverServiceTimeContainerProps & IDriverServiceTimeActionProps) => {
    const headers = ['Driver Id', 'Driver Name', 'Driver Mobile', 'Vehicle Name', 'Vehicle License No'];
    const groupedDataByDriverId = groupBy(props.driversServiceTime, 'DriverVehicleId') as IGroupedDriverServiceTime;
    const driverServiceTime = getWithSubModel(groupedDataByDriverId);

    const collapsibleTableProps = {
        data: driverServiceTime,
        headers,
    } as ICollapsibleTableProps;

    const dashboardComponentProps = {
        tableData: collapsibleTableProps
    } as IDriverServiceTimeComponentProps;

    useEffect(
        () => {
            props.loadDriversServiceTime();
        },
        [props.loadDriversServiceTime]);

    return (
        <DriverServiceComponent {...dashboardComponentProps} />
    );
};

export const getWithSubModel = (groupedData: IGroupedDriverServiceTime, speedLimit = 60): IDriverServiceTimeModel[] => {
    let driverServiceTime = [] as IDriverServiceTimeModel[];

    for (let key in groupedData) {
        if (key) {
            const {
                DCS_DriverMaster: { DriverId, DriverMobile, DriverName },
                CreatedDate,
                DCS_VehicleMaster: { VehicleLicenseNo, VehicleName }
            } = groupedData[key][0];
            let driverServiceTimeModel = {
                DriverId,
                CreatedDate,
                DriverMobile,
                DriverName,
                VehicleLicenseNo,
                VehicleName,
                SubModel: [] as IDriverServiceTimeSubModel[]
            } as IDriverServiceTimeModel;

            groupedData[key].map((c, index) => {
                driverServiceTimeModel.SubModel[index] = {
                    RestingStartTime: '',
                    RestingEndTime: '',
                    VehicleStartTime: '',
                    VehicleEndTime: ''
                } as IDriverServiceTimeSubModel;
                driverServiceTimeModel.SubModel[index].RestingStartTime = c.RestingStartTime;
                driverServiceTimeModel.SubModel[index].RestingEndTime = c.RestingEndTime;
                driverServiceTimeModel.SubModel[index].VehicleStartTime = c.VehicleStartTime;
                driverServiceTimeModel.SubModel[index].VehicleEndTime = c.VehicleEndTime;

                return c;
            });

            driverServiceTime.push(driverServiceTimeModel);
        }
    }
    return driverServiceTime;
};

const mapStateToProps = ({ driversServiceTime }: { driversServiceTime: IDriverServiceTimeContainerProps }) => {
    return {
        driversServiceTime: driversServiceTime.driversServiceTime
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadDriversServiceTime: () => loadDriversServiceTime()
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DriverServiceTimeContainer);
