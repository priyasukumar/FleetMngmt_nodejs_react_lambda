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
    const [errorMessage, setError] = useState<string | null>(null);

    const handleFromDateChange = (fromDate: Date) => {
        const diff = getDateRangeDiff(fromDate, datePickerToDate, 'days');
        if (fromDate > datePickerToDate) {
            setError('From date should not be in future');
            return;
        }
        if (diff > 10) {
            setError('Date range should be less than 7 days');
            return;
        }
        setError(null);
        props.handleFromDateChange(fromDate);
    };

    const handleToDateChange = (toDate: Date) => {
        if (toDate < datePickerFromDate) {
            setError('To date cannot be lesser then From date');
            return;
        }
        const diff = getDateRangeDiff(datePickerFromDate, toDate, 'days');
        if (diff > 10) {
            setError('Date range should be less than 7 days');
            return;
        }
        setError(null);
        props.handleToDateChange(toDate);
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
                        helperText={errorMessage ? errorMessage : null}
                        error={errorMessage != null}
                        margin="normal"
                        id="date-picker-inline"
                        label="From Date"
                        value={datePickerFromDate}
                        onChange={(value: any) => handleFromDateChange(value)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        variant="inline"
                        minDate={datePickerMinDate}
                        maxDate={datePickerMaxDate}
                        helperText={errorMessage ? errorMessage : null}
                        error={errorMessage != null}
                        margin="normal"
                        id="date-picker-dialog"
                        label="To Date"
                        format={datePickerDateFormat}
                        value={datePickerToDate}
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