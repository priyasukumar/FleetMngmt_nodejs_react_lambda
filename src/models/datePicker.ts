export interface IDatePickerProps {
    datePickerFromDate: Date;
    datePickerToDate: Date;
    datePickerMinDate: Date;
    datePickerMaxDate: Date;
    datePickerDateFormat: string;
    handleFromDateChange: (fromDate: Date | null, toDate: Date | null) => void;
    handleToDateChange: (fromDate: Date | null, toDate: Date | null) => void;
    handleDateChange: (fromDate: Date | null, toDate: Date | null) => void;
}