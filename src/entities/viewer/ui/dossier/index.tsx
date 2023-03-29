import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Button } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { UserDossierView } from '../../../user';
import { Viewer } from '../../model/types';

type Props = {
    viewer: Viewer | BaseTypes.Empty;
    logoutClick: () => void;
    replaceAvatarClick: () => void;
} & BaseTypes.Statuses;

function ViewerDossierView(props: Props) {
    const { viewer, logoutClick, replaceAvatarClick, loading } = props;

    return (
        <Box className={styles.wrapper} loading={!!loading}>
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
        </Box>
    );
}

export default ViewerDossierView;
