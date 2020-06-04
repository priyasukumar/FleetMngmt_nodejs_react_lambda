import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export interface IDiscreteSliderProps {
    title: string;
    value: number;
    min: number;
    max: number;
    speedLimit: number;
    onSliderChange: (limit: number) => void;
}

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

const valuetext = (value: number) => {
    return `${value} km/hr`;
};

const DiscreteSliderComponent = (props: IDiscreteSliderProps) => {
    const { title, min, max, speedLimit, onSliderChange } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography id="discrete-slider-always" gutterBottom={true}>{title}</Typography>
            <Slider
                value={speedLimit ? speedLimit : 60}
                onChange={(e, limit) => onSliderChange(Number(limit))}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                step={10}
                marks={true}
                min={min}
                max={max}
            />
        </div>
    );
};

export default DiscreteSliderComponent;