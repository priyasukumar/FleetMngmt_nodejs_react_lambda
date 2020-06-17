import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import { Grid,Paper,Box ,Theme} from '@material-ui/core';
import {makeStyles,  createStyles} from '@material-ui/styles'
import { IDashboardComponentProps } from '../../models/dashboard';
import Legend from '../../core/LegendComponent';
import CollapsibleTable from '../../core/Table/TableComponent';
import DatePicker from '../../core/DatePicker';
import { Rating } from '@material-ui/lab';
import { Suspense } from 'react';
import red from '@material-ui/core/colors/red';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { borders } from '@material-ui/system';
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        content: {
            
            textAlign: 'center',
            background:(props:any)=>props.bgcolor,
            color:(props:any)=>props.color,
            fontSize: 45,
        },
        title: {
            fontSize: 16,
            textAlign: 'center',
            background:(props:any)=>props.bgcolor,
            color:(props:any)=>props.color,
           
          }
    }),
);

const DashboardComponent = (props: IDashboardComponentProps) => {
    const classes = useStyles();
    const { graphData, tableData, datePicker,alertData,serviceReminder } = props;

    return (
        <div className={classes.root}>
            <Suspense fallback={<div>Loading...</div>}>
            <Box display="flex" flexDirection="row" p={1} m={1} >
            <Box width="25%" borderColor="transparent" borderRadius="1%" border={1} m={1} bgcolor="white" justifyContent="center"> 
              
               <ScoreCard  bgcolor="#80deea" color="#0097a7"></ScoreCard>
              
                    
            </Box>
               
               
                   
                    
                    <Grid container={true} direction="row" spacing={2} alignItems="center">
                        {alertData.map (alert=>(
                        <Grid item={true} xs={3}>
                           
                            <CardComponent name={alert.name} value={alert.value} bgcolor={red[300]} color={red[50]} elevation={15}></CardComponent>
                           
                        </Grid> 
                        ))}
                    </Grid>
                  
                </Box>
                
                <section title="reminders">
                   
                    
                    
                    <Box width="60%" borderColor="transparent" borderRadius="1%" border={1} m={1} bgcolor="transparent" justifyContent="center"> 
                    <h5 text-align="center" color="blue">
                        
                    <Typography component="legend">VEHICLE SERVICE REMINDERS</Typography>
                    
                   
                    </h5>
                    
                        <Grid container={true} direction="row" alignItems="flex-start" >
                            {serviceReminder.map (service=>(
                            <Grid item={true} xs={3}>
                              
                                <CardComponent name={service.name} value={service.value} bgcolor='white' color={service.color} elevation={0}></CardComponent>
                    
                            </Grid> 
                            ))}
                             <Grid item={true} xs={3}>
                              <PieChart plot={graphData} title="Over All" /> 
                              </Grid>
                        </Grid>
                    </Box>
                    <DatePicker {...datePicker} />
                    <CollapsibleTable {...tableData} />
                </section>
            </Suspense>
        </div>
    );
};

export const CardComponent=({name,value,elevation,...props}:any)=>{
    const classes = useStyles(props);
return (
    <Card elevation={elevation}>
        <CardContent className={classes.title}>
            
           {name}
            
        </CardContent>
        <CardContent className={classes.content}>
            
           {value}
        
        </CardContent>
        
    </Card>
);
};
export const ScoreCard=(props:any)=>{
    const classes = useStyles(props);
    return (
        <Card elevation={24} >
        <CardContent className={classes.title}>
            
        <Typography component="legend">Driver of the week</Typography>
            
        </CardContent>
        <CardContent className={classes.content}>
            
        <Rating name="half-rating-read" defaultValue={9} precision={0.5} max={10} 
                getLabelText={(value:any) => `${value} Heart${value !== 1 ? 's' : ''}`} readOnly />
        
        
        </CardContent>
        
    </Card>
    );
};
export default DashboardComponent;

