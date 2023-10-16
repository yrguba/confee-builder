import React, { CSSProperties } from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Card, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { Company, EmployeeStatuses } from '../../model/types';
import EmployeeStatusView from '../employee/status';

type Props = {
    title: string;
    subtitle: string;
    status: keyof typeof EmployeeStatuses;
    position: string;
    width?: string;
    style?: CSSProperties;
    cardClick?: () => void;
} & BaseTypes.Statuses;

function CompanyCardView(props: Props) {
    const { cardClick, style, title, status, subtitle, position, width } = props;
    const sm = useWidthMediaQuery().to('sm');

    return (
        <div className={styles.wrapper} style={{ ...style, cursor: cardClick ? 'pointer' : 'default' }} onClick={cardClick}>
            <div className={styles.body}>
                <Card icon={<Icons.Logo variant="softworks" />} title={title} subtitle={subtitle} />
                <Title textWrap variant="H3M">
                    {position || 'Нет данных'}
                </Title>
                <EmployeeStatusView status={status} />
            </div>
        </div>
    );
}

export default CompanyCardView;
