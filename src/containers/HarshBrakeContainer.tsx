import * as React from 'react';
import { connect } from 'react-redux';
import { IDashboardProps } from '../models/dashboard';
import HarshBrakeComponent from '../components/dashboard/HarshBrakeComponent';

const HarshBrakeContainer = (props: IDashboardProps) => {

    return (
        <HarshBrakeComponent dashboard={props.dashboard} />
    );
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

export default connect(
    mapStateToProps
)(HarshBrakeContainer);
