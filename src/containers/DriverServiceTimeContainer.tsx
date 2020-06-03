import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { IDriverServiceTimeProps, IDriverServiceTimeActionProps } from '../models/driverServiceTime';
import DriverServiceComponent from '../components/dashboard/DriverServiceComponent';
import { loadDriversServiceTime } from '../actions/DriverServiceTimeAction';

const DriverServiceTimeContainer = (props: IDriverServiceTimeProps & IDriverServiceTimeActionProps) => {
    useEffect(
        () => {
            props.loadDriversServiceTime();
        },
        []);

    return (
        <DriverServiceComponent driversServiceTime={props.driversServiceTime} />
    );
};

const mapStateToProps = ({ driversServiceTime }: { driversServiceTime: IDriverServiceTimeProps }) => {
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
