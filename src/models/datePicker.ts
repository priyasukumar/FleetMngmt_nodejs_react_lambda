export interface IDatePickerProps {
    datePickerFromDate: Date;
    datePickerToDate: Date;
    datePickerMinDate: Date;
    datePickerMaxDate: Date;
    datePickerDateFormat: string;
    handleFromDateChange: (fromDate: Date | null) => void;
    handleToDateChange: (toDate: Date | null) => void;
}