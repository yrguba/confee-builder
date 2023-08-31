import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { EmployeeProxy } from '../../../model/types';

type Props = {
    employee: EmployeeProxy | BaseTypes.Empty;
    back: () => void;
} & BaseTypes.Statuses;

function EmployeeProfileView(props: Props) {
    const { employee, back } = props;

    const items = [{ id: 0, title: employee?.full_name || '', subtitle: 'Имя и фамилия' }];
    console.log(employee);
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                {useWidthMediaQuery().to('sm') && (
                    <Button.Circle onClick={back} variant="secondary">
                        <Icons variant="arrow-left" />
                    </Button.Circle>
                )}
                <Title variant="H2">Личная информация</Title>
            </div>
            <div className={styles.body}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        {item.id === 0 && <Avatar img={employee?.avatar} name={employee?.full_name} />}
                        <div className={styles.left}>
                            <div className={styles.aboutMe}>
                                <Title textWrap variant="H3M">
                                    {item.title}
                                </Title>
                            </div>
                            <Title primary={false} variant="H4M">
                                {item.subtitle}
                            </Title>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeProfileView;
