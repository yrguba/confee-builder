import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Card, Dropdown, DropdownTypes, Icons, IconsTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { EmployeeProxy } from '../../../model/types';
import Status from '../status';

type Props = {
    employee: EmployeeProxy | BaseTypes.Empty;
    back: () => void;
} & BaseTypes.Statuses;

function EmployeeProfileView(props: Props) {
    const { employee, back } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => '' },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => '' },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
    ];

    const secondaryInfo = [
        { id: 0, title: '', subtitle: 'Никнейм' },
        { id: 1, title: '', subtitle: 'Номер телефона' },
        { id: 2, title: '', subtitle: 'Дата рождения' },
        { id: 3, title: '', subtitle: 'О себе' },
    ];

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: '',
            icon: <Icons variant="delete" />,
            callback: () => '',
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar size={200} img={employee?.avatar} name={employee?.full_name} />

                <div className={styles.name}>
                    <Title textAlign="center" variant="H3M">
                        {employee?.full_name}
                    </Title>
                    <Button tag>tfn</Button>
                </div>
                <Title textAlign="center" variant="caption1M">
                    {employee?.status || ''}
                </Title>
            </div>
            <div className={styles.btns}>
                {btns.map((i) => (
                    <Dropdown.Menu visible={false} position="bottom-center" items={menuItems} key={i.id} disabled>
                        <Button direction="vertical" prefixIcon={<Icons variant={i.icon} />} onClick={i.callback}>
                            {i.title}
                        </Button>
                    </Dropdown.Menu>
                ))}
            </div>
            {employee?.companies.map((i, index) => (
                <div key={i.id} className={styles.companyInfo}>
                    <Card icon={<Icons.Logo variant="softworks" />} title={i.name || ''} subtitle={employee.departments[index].name || ''} />
                    <div className={styles.position}>
                        <Title variant="H3M">{employee?.position || ''}</Title>
                        <Title variant="caption1M" primary={false}>
                            Должность
                        </Title>
                    </div>
                    <div className={styles.status}>
                        <Status status={employee?.status} />
                    </div>
                </div>
            ))}

            <div className={styles.secondaryInfo}>
                {secondaryInfo.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <Title variant="H4M" primary={false}>
                            {i.title}
                        </Title>
                        <Title variant="H3M">{i.subtitle}</Title>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeProfileView;
