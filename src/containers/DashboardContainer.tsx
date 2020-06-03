import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { IDashboardProps, IDashboardActionProps } from '../models/dashboard';
import DashboardComponent from '../components/dashboard/DashboardComponent';
import { loadDashboard } from '../actions/DashboardActions';

const DashboardContainer = (props: IDashboardProps & IDashboardActionProps) => {
    useEffect(
        () => {
            props.loadData();
        },
        [props.loadData]);

    return (
        <DashboardComponent dashboard={props.dashboard} />
    );
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardProps }) => {
    return {
        dashboard: dashboard.dashboard
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadData: () => loadDashboard()
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
