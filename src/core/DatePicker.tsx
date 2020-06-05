import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { IDatePickerProps } from '../models/datePicker';

const DatePicker = (props: IDatePickerProps) => {
    const { datePickerFromDate, datePickerToDate, datePickerMinDate, datePickerMaxDate, datePickerDateFormat, handleFromDateChange, handleToDateChange } = props;
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container={true} xl={10} alignItems="flex-end" justify="space-around">
                <KeyboardDatePicker
                    variant="inline"
                    minDate={datePickerMinDate}
                    maxDate={datePickerMaxDate}
                    format={datePickerDateFormat}
                    margin="normal"
                    id="date-picker-inline"
                    label="From Date"
                    value={datePickerFromDate}
                    onChange={handleFromDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardDatePicker
                    variant="inline"
                    minDate={datePickerMinDate}
                    maxDate={datePickerMaxDate}
                    margin="normal"
                    id="date-picker-dialog"
                    label="To Date"
                    format={datePickerDateFormat}
                    value={datePickerToDate}
                    onChange={handleToDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;