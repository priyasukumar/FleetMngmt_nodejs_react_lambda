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
        [props.data]);

    return (
        <DashboardComponent data={props.data} />
    );
};

const mapStateToProps = ({ dashboard }: { dashboard: IDashboardProps }) => {
    return {
        data: dashboard.data
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
