import * as React from 'react';
import { IRangeFilterModel, IRangeFilterModelProps } from '../../models/dashboard';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RangeFilterComponenet = (props: IRangeFilterModelProps) => {
    const { rangeFilter, handleRangeFilterChange } = props;
    const classes = useStyles();

    return (
        <>
          <div>
          {rangeFilter &&
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Range</InputLabel>
            <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleRangeFilterChange}
          >
            {rangeFilter.map((range) => <MenuItem key={range.id} value={range.to}>{range.displayText}</MenuItem>)}
          </Select>
          </FormControl>
      }
          </div>
        </>
    )      
}

export default RangeFilterComponenet;