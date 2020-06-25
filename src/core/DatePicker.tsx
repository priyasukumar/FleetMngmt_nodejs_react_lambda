import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { IDatePickerProps } from '../models/datePicker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { getDateRangeDiff } from '../utils/date';
import { useDispatch } from 'react-redux';
import { UPDATE_DATE } from '../constants/Actions';

const useCustomThemeStyles = createMuiTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#1976d2',
        }
    },
});

const DatePicker = (props: IDatePickerProps) => {
    const { datePickerFromDate, datePickerToDate, datePickerMinDate, datePickerMaxDate, datePickerDateFormat } = props;
    const [fromDateErrorMessage, setFromDateError] = useState<string | null>(null);
    const [toDateErrorMessage, setToDateError] = useState<string | null>(null);

    const [fromDateFromState, setFromDate] = useState<Date>(datePickerFromDate);
    const [toDateFromState, setToDate] = useState<Date>(datePickerToDate);
    const dispatch = useDispatch();

    const handleFromDateChange = (fromDate: Date) => {
        if (!(fromDate instanceof Date) || fromDate.toString() === "Invalid Date") {
            setFromDateError("Invalid Date Format");
            return;
        }

        setFromDate(fromDate)
        dispatch({
            type: UPDATE_DATE,
            payload:{
                currentDate: toDateFromState,
                initialToDate: fromDate,
            }
        })

        const diff = getDateRangeDiff(fromDate, toDateFromState, 'days');
        if (fromDate > toDateFromState) {
            setFromDateError('From date should not be in future');
            return;
        }
        if (diff > 10) {
            setFromDateError('Date range should be less than 10 days');
            return;
        }
        
        setFromDateError(null);
        setToDateError(null);
        
        props.handleDateChange(fromDate, toDateFromState);
    };

    const handleToDateChange = (toDate: Date) => {
        if (!(toDate instanceof Date) || toDate.toString() === "Invalid Date") {
            setToDateError("Invalid Date Format");
            return;
        }

        setToDate(toDate)
        dispatch({
            type: UPDATE_DATE,
            payload:{
                currentDate:toDate,
                initialToDate: fromDateFromState
            }
        })

        if (toDate < fromDateFromState) {
            setToDateError('To date cannot be lesser then From date');
            return;
        }
        const diff = getDateRangeDiff(fromDateFromState, toDate, 'days');
        if (diff > 10) {
            setToDateError('Date range should be less than 10 days');
            return;
        }

        setToDateError(null);
        setFromDateError(null);
        props.handleDateChange(fromDateFromState, toDate);
    };

    return (
        <MuiThemeProvider theme={useCustomThemeStyles}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container={true} xl={10} alignItems="flex-end" justify="space-around">
                    <KeyboardDatePicker
                        variant="inline"
                        minDate={datePickerMinDate}
                        maxDate={datePickerMaxDate}
                        format={datePickerDateFormat}
                        helperText={fromDateErrorMessage ? fromDateErrorMessage : null}
                        error={fromDateErrorMessage != null}
                        margin="normal"
                        id="date-picker-inline"
                        label="From Date"
                        value={fromDateFromState}
                        autoOk={true}
                        onChange={(value: any) => handleFromDateChange(value)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        variant="inline"
                        minDate={datePickerMinDate}
                        maxDate={datePickerMaxDate}
                        helperText={toDateErrorMessage ? toDateErrorMessage : null}
                        error={toDateErrorMessage != null}
                        margin="normal"
                        id="date-picker-dialog"
                        label="To Date"
                        format={datePickerDateFormat}
                        value={toDateFromState}
                        autoOk={true}
                        onChange={(value: any) => handleToDateChange(value)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
};

export default DatePicker;