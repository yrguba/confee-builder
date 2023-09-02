import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Title } from '../../../../../shared/ui';
import { EmployeeStatuses } from '../../../model/types';

type Props = {
    status: keyof typeof EmployeeStatuses;
} & BaseTypes.Statuses;

function EmployeeStatusView(props: Props) {
    const { status } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.indicator} style={{ backgroundColor: EmployeeStatuses[status] }} />
            <Title variant="H3S">{status}</Title>
        </div>
    );
}

export default EmployeeStatusView;
