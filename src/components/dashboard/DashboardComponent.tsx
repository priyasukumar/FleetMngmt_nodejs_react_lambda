import * as React from 'react';
import PieChart from '../../core/PieChartComponent';
import Bar from '../../core/BarComponent';
import { Grid,Paper,Box ,Theme} from '@material-ui/core';
import {makeStyles,  createStyles} from '@material-ui/styles'
import { IDashboardComponentProps } from '../../models/dashboard';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

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
        media:
        {
            height:100,
            
        },
        title: {
            fontSize: 16,
            textAlign: 'center',
            background:(props:any)=>props.bgcolor,
            color:(props:any)=>props.color,
            m:1,
            padding:1,
            spacing:1
          }
    }),
);

const DashboardComponent = (props: IDashboardComponentProps) => {
    const classes = useStyles();
    const { graphData, tableData, datePicker,alertData,serviceReminder } = props;

    return (
        <div className={classes.root}>
            <Suspense fallback={<div>Loading...</div>}>
             <Grid container={true} direction="row"  alignItems="center" spacing={2}>
                        <Grid item={true} xs={4}>
                          
                         <ScoreCard  bgcolor="white" color="#0097a7"></ScoreCard>
                        
                        </Grid>
                        <Grid item={true} xs={1}>
                       
                        </Grid>
                        <Grid item={true} xs={4}>
                            <PieChart plot={graphData} title="ALERTS RECEIVED ON PAST 7 DAYS" />
                        </Grid>
                        <Grid item={true} xs={3}>
                            <Legend data={graphData} />
                        </Grid>
                </Grid>
      
                
                
                <section title="reminders">
                   
                    
                    
                    <Box width="60%" borderColor="transparent" borderRadius="1%" border={1} m={1} bgcolor="transparent" justifyContent="center"> 
                   
                    <h3 style={{ textAlign: 'center' ,color:'#0097a7'}}> 
                    VEHICLE SERVICE REMINDERS
                    
                   
                    </h3>
                    
                        <Grid container={true} direction="row" alignItems="flex-start" >
                            {serviceReminder.map (service=>(
                            <Grid item={true} xs={3}>
                              
                                <CardComponent name={service.name} value={service.value} bgcolor='white' color={service.color} elevation={0}></CardComponent>
                    
                            </Grid> 
                            
                            ))}
                            <Grid item={true} xs={3}>
                            {/* <Bar {alertData} /> */}
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
    const sty={
        height:300,
        width:280,
      

    };
    return (
        <Card elevation={24} style={sty} >
       <CardContent className={classes.title}>
         <Typography component="legend">DRIVER OF THE WEEK</Typography>
                <CardMedia
            className={classes.media}
            image="../../stardriver.png"
            title="Contemplative Reptile"

            />
    <Typography component="legend">D1</Typography>
      
           <Rating name="half-rating-read" defaultValue={9} precision={0.5} max={10} 
                getLabelText={(value:any) => `${value} Heart${value !== 1 ? 's' : ''}`} readOnly />

        
              </CardContent>

        
    </Card>
    );
};
export default DashboardComponent;

