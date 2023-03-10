import React from 'react';

import { baseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { chatTypes, Card } from '../..';

type Props = {
    list: any;
} & baseTypes.ComponentProps;

function List(props: Props) {
    const { list, loading, error } = props;

    return <div>w</div>;
}

export default List;
