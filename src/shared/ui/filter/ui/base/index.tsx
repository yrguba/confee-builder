import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { BaseFilterProps } from '../../types';

function BaseFilter(props: BaseFilterProps) {
    const { title, items, ...other } = props;

    const classes = useStyles(styles, 'wrapper', {});

    return <div>wdw</div>;
}

export default BaseFilter;
