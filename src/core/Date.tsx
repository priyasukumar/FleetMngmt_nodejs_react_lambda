import React, { useContext, useState, ReactHTMLElement } from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker, MuiPickersContext } from '@material-ui/pickers';
import { createStyles, Theme, makeStyles } from '@material-ui/core';
import Moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export interface IDateRangeWrapper {
    value: MaterialUiPickersDate[];
    onChange: (date: MaterialUiPickersDate) => void;
    labelFunc?: (date: MaterialUiPickersDate, invalidLabel: string) => string;
    format: string;
    emptyLabel: string;
    onClose(): void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        day: {
            margin: 0,
            width: 40,
            borderRadius: 0,
        },
        beginCap: {
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
        },
        endCap: {
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
        },
    })
);

const DateRangeWrapper = () => {
    // const { value, onChange, labelFunc, format, emptyLabel, onClose } = props;
    const originalClasses = useStyles();

    const [begin, setBegin] = useState<MaterialUiPickersDate | undefined>(new Date());
    const [end, setEnd] = useState<MaterialUiPickersDate | undefined>(new Date());
    const [hover, setHover] = useState<MaterialUiPickersDate | undefined>(undefined);
    const utils = useContext(MuiPickersContext);

    // const min = Math.min(begin, end || hover);
    // const max = Math.max(begin, end || hover);

    const renderDay = (day: MaterialUiPickersDate, selectedDate: MaterialUiPickersDate, dayInCurrentMonth: boolean, dayComponent: JSX.Element) => {
        return React.cloneElement(dayComponent, {
            onClick: (e: any) => {
                e.stopPropagation();
                if (!begin) {
                    setBegin(day);
                } else if (!end) {
                    setEnd(day);
                } else {
                    setBegin(day);
                    setEnd(undefined);
                }
            },
            onMouseEnter: (e: any) => setHover(day),
            hidden: dayComponent.props.hidden,
            current: dayComponent.props.current,
            dayDisabled: dayComponent.props.disabled,
            // daySelected: utils?.isSameDay(day, min) || utils?.isSameDay(day, max) || (day >= min && day <= max),
            // beginCap: utils?.isSameDay(day, min),
            // endCap: utils?.isSameDay(day, max)
        });
    };

    const formatDate = (date: Date) => utils?.format(date, 'dd/MM/yyyy');

    return (
        <DateTimePicker
            // {...props}
            fullWidth={true}
            value={begin}
            renderDay={renderDay}
            // onClose={onClose}
            onChange={date => {
                // onChange([begin, end].sort((a, b) => a - b));
            }}
            // onClear={() => {
            //     setBegin(undefined);
            //     setEnd(undefined);
            //     setHover(undefined);
            //     onChange([]);
            // }}
            // labelFunc={(date, invalid) =>
            //     labelFunc
            //         ? labelFunc([begin, end].sort((a, b) => a - b), invalid)
            //         : date && begin && end
            //             ? [begin, end].sort((a, b) => a - b).map(formatDate).join(' - ')
            //             : emptyLabel || ''
            // }
        />
    );
};

export default DateRangeWrapper;