import React from 'react';

import { UserInfoView } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { useWidthMediaQuery } from '../../../../shared/hooks';
import { Avatar, AvatarTypes, Button, Title } from '../../../../shared/ui';
import { BindCompanyView, CompanyCardView } from '../../../company';
import { Company } from '../../../company/model/types';
import { ViewerProxy } from '../../model/types';

type Props = {
    viewer: ViewerProxy | BaseTypes.Empty;
    companies: Company[];
    clickSettings: () => void;
    avatarActions?: AvatarTypes.AvatarChangeActions;
    clickAvatar: () => void;
    openAuthCompanyModal: () => void;
} & BaseTypes.Statuses;

function ViewerProfileView(props: Props) {
    const { openAuthCompanyModal, companies, clickAvatar, avatarActions, clickSettings, viewer, loading } = props;
    const sm = useWidthMediaQuery().to('sm');

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarBlock}>
                {avatarActions && (
                    <Avatar.Change
                        clickAvatar={clickAvatar}
                        dropdownLeft={20}
                        dropdownTop={180}
                        {...avatarActions}
                        circle={false}
                        size={201}
                        img={viewer?.avatar || ''}
                    />
                )}
                <Button onClick={clickSettings}>Редактировать профиль</Button>
            </div>
            <div className={styles.description}>
                <div className={styles.name}>
                    <Title variant="H1">{viewer?.full_name}</Title>
                </div>
                <UserInfoView user={viewer as any} />
                {companies.length ? (
                    <CompanyCardView
                        title={companies[0]?.name || ''}
                        subtitle={companies[0].departments[0].name || ''}
                        status="in office"
                        position={companies[0].departments[0].employees[0].status || 'in office'}
                    />
                ) : (
                    <BindCompanyView addClick={openAuthCompanyModal} />
                )}
            </div>
        </div>
    );
}

export default ViewerProfileView;
