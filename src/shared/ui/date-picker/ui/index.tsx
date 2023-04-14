import ru from 'date-fns/locale/ru';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';

import Icons from './icons';
import styles from './styles.module.scss';
import { useToggle } from '../../../hooks';
import Box from '../../box';
import { DatePickerProps } from '../types';

registerLocale('ru', ru);
function DatePicker(props: DatePickerProps) {
    const { title, defaultValue, onChange, ...other } = props;
    const [value, setValue] = useState<any>(null);
    const [open, toggle] = useToggle();

    const pickerOnchange = (date: Date) => {
        setValue(date);
        onChange(date);
    };

    return (
        <div className={styles.wrapper} onMouseLeave={() => toggle(false)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.btn} onClick={() => toggle(true)}>
                {!open && <div className={styles.value}> {value ? moment(value).format('MM/DD/YYYY') : defaultValue}</div>}
                <Box.Animated visible={open} className={styles.datePicker}>
                    <ReactDatePicker {...other} open={open} locale="ru" selected={value} onChange={pickerOnchange} />
                </Box.Animated>
                <div className={styles.icon}>
                    <Icons variants="calendar" />
                </div>
            </div>
        </div>
    );
}

export default DatePicker;
