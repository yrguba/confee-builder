import React from 'react';

import { baseTypes } from 'shared/types';
import { Button, LoadingIndicator } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { UserDossierView, UserTypes } from '../../../user';
import { Viewer } from '../../model/types';

type Props = {
    viewer: (UserTypes.User & Viewer) | baseTypes.Empty;
    logoutClick: () => void;
    replaceAvatarClick: () => void;
} & baseTypes.Statuses;

function ViewerDossierView(props: Props) {
    const { viewer, logoutClick, replaceAvatarClick, loading, error } = props;

    return (
        <div className={styles.wrapper}>
            <LoadingIndicator.Glare visible={!!loading} />
            {viewer && (
                <>
                    <div className={styles.dossier}>
                        <UserDossierView user={viewer} />
                    </div>
                    <div className={styles.footer}>
                        <Button onClick={replaceAvatarClick}>Заменить фото</Button>
                        <div className={styles.logout} onClick={logoutClick}>
                            <Icons variants="logout" />
                            Выход из учетной записи
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ViewerDossierView;
