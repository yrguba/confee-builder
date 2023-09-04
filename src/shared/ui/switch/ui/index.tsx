import React from 'react';
import ReactSwitch from 'react-switch';

import styles from './styles.module.scss';
import { BaseSwitchProps } from '../types';

function Switch(props: BaseSwitchProps) {
    const { ...other } = props;

    return (
        <ReactSwitch onColor="#7B57C8" offColor="#DDE4EF" {...other} checkedIcon={props.checkedIcon || false} uncheckedIcon={props.uncheckedIcon || false} />
    );
}

export default Switch;
