import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import { Grid, makeStyles, Theme, createStyles,Paper,Box } from '@material-ui/core';
import { IDashboardComponentProps, IAlertData } from '../../models/dashboard';
import Legend from '../../core/LegendComponent';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { Suspense } from 'react';
import red from '@material-ui/core/colors/red';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        content: {
            padding: theme.spacing(2),
            textAlign: 'center',
            background:red[300],
            color:red[50],
            fontSize: 30,
        },
        title: {
            fontSize: 14,
            textAlign: 'center',
            background:red[300],
            color:red[50]
           
          }
    }),
);

const DashboardComponent = (props: IDashboardComponentProps) => {
    const classes = useStyles();
    const { graphData, tableData, datePicker,alertData } = props;

    return (
        <div className={classes.root}>
            <Suspense fallback={<div>Loading...</div>}>
                <section title="ALERTS RECEIVED">
                    <header>
                    ALERTS RECEIVED
                    </header>
                    <Grid container={true} direction="row" justify="space-around" alignItems="center" spacing={2}>
                        {alertData.map (alert=>(
                        <Grid item={true} xs={3}>
                            {/* <PieChart plot={graphData} title="Over All" /> */}
                            <CardComponent name={alert.name} value={alert.value}></CardComponent>
                           
                        </Grid> 
                        ))}
                    </Grid>
                   
                </section>
            </Suspense>
        </div>
    );
};

export const CardComponent=({name,value}:IAlertData)=>{
    const classes = useStyles();
return (
    <Card elevation={15}>
        <CardContent className={classes.title}>
            
           {name}
            
        </CardContent>
        <CardContent className={classes.content}>
            
           {value}
        
        </CardContent>
        
    </Card>
);
};

export default DashboardComponent;

