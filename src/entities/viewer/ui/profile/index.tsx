import React from 'react';

import { UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Company, Department } from '../../../company/model/types';
import { ViewerProxy } from '../../model/types';

type Props = {
    viewer: ViewerProxy | BaseTypes.Empty;
    companies?: Company[];
    departments?: Department[];
    clickSettings: () => void;
} & BaseTypes.Statuses;

function ViewerProfileView(props: Props) {
    const { clickSettings, viewer, loading, companies, departments } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView
                    clickSettings={clickSettings}
                    name={viewer?.full_name || ''}
                    birth={viewer?.formatted_birth || ''}
                    aboutMe=""
                    nickname={viewer?.nickname || ''}
                    phone={viewer?.phone || ''}
                    avatar={viewer?.avatar || ''}
                    loading={loading}
                    email={viewer?.email}
                    companies={companies}
                    departments={departments}
                />
            </div>
        </div>
    );
}

export default ViewerProfileView;
