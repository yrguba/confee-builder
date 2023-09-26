import React from 'react';

import { UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { AvatarTypes } from '../../../../shared/ui';
import { Company, Department } from '../../../company/model/types';
import { ViewerProxy } from '../../model/types';

type Props = {
    viewer: ViewerProxy | BaseTypes.Empty;
    companies?: Company[];
    clickSettings: () => void;
    avatarActions?: AvatarTypes.AvatarChangeActions;
    clickAvatar: () => void;
} & BaseTypes.Statuses;

function ViewerProfileView(props: Props) {
    const { clickAvatar, avatarActions, clickSettings, viewer, loading, companies } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView
                    clickAvatar={clickAvatar}
                    clickSettings={clickSettings}
                    user={viewer as any}
                    loading={loading}
                    companies={companies}
                    avatarActions={avatarActions}
                />
            </div>
        </div>
    );
}

export default ViewerProfileView;
