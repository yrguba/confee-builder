import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Card, Dropdown, DropdownTypes, Icons, IconsTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {} & BaseTypes.Statuses;

function CompanyCardView(props: Props) {
    // const { employee, back } = props;

    return <div className={styles.wrapper}>CompanyCardView</div>;
}

export default CompanyCardView;
