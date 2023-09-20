import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { UserCardView, userProxy } from '../../../../user';
import { UserProxy } from '../../../../user/model/types';
import { EmployeeProxy } from '../../../model/types';

type Props = {
    employee: EmployeeProxy | BaseTypes.Empty;
    back: () => void;
} & BaseTypes.Statuses;

function EmployeeProfileView(props: Props) {
    const { employee, back, loading } = props;

    const user: UserProxy | null = employee?.user ? userProxy(employee?.user) : null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView
                    actions={{
                        videoCall: () => console.log('videoCall'),
                        audioCall: () => console.log('audioCall'),
                        getChat: () => console.log('getChat'),
                        mute: () => console.log('mute'),
                    }}
                    avatar={employee?.avatar || ''}
                    visibleHeader
                    type="employee"
                    visibleActionsMenu
                    user={user}
                    companies={employee?.companies}
                    departments={employee?.departments}
                    position={employee?.position || ''}
                    name={employee?.full_name}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default EmployeeProfileView;
