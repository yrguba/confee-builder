import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Title } from '../../../../shared/ui';

type Props = {
    name: string;
} & BaseTypes.Statuses;

function CompanyTagView(props: Props) {
    const { name } = props;

    return (
        <div className={styles.wrapper}>
            <Title variant="caption1M">{name}</Title>
        </div>
    );
}

export default CompanyTagView;
