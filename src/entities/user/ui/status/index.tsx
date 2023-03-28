import React from 'react';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { UserStatuses } from '../../model/types';

type Props = {
    status: UserStatuses;
} & baseTypes.Statuses;

function UserStatusView(props: Props) {
    const { status } = props;

    const data: { id: number; trigger: UserStatuses; text: string; color: string }[] = [
        { id: 0, trigger: 'in-office', text: 'В офисе', color: '#29CC39' },
        { id: 1, trigger: 'home-work', text: 'Работаю из дома', color: '#8833FF' },
        { id: 2, trigger: 'business-trip', text: 'В командировке', color: '#33BFFF' },
        { id: 3, trigger: 'vacation', text: 'В отпуске', color: '#2EE5C9' },
        { id: 4, trigger: 'sick-leave', text: 'На больничном', color: '#FFCB33' },
        { id: 5, trigger: 'meeting', text: 'На совещании', color: '#FF6633' },
        { id: 6, trigger: 'not-available', text: 'Недоступен', color: '#E62E7B' },
    ];

    const getItem = () => {
        const found = data.find((i) => i.trigger === status);
        return found || { text: '', color: '' };
    };

    const { text, color } = getItem();

    return (
        <div style={{ backgroundColor: color }} className={styles.wrapper}>
            {text}
        </div>
    );
}

export default UserStatusView;
