import { ReactDatePickerProps } from 'react-datepicker';

import { BaseTypes } from 'shared/types';

export type DatePickerProps = {
    defaultValue?: string;
    title?: string;
    onChange: (date: Date) => void;
} & ReactDatePickerProps &
    BaseTypes.Statuses;
