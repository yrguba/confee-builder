import React from 'react';

import { useStyles, useToggle } from 'shared/hooks';

import styles from './styles.module.scss';
import Icons from '../../icons';
import { ScrollbarProps } from '../types';

function Scrollbar(props: ScrollbarProps) {
    const { wrapper } = props;

    console.log(wrapper);
    return <div className={styles.wrapper}>Scrollbar</div>;
}

export default Scrollbar;
