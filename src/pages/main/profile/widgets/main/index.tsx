import React from 'react';

import { viewerApi } from 'entities/viewer';
import { AuthAd } from 'features/auth';
import { BindCompany } from 'features/company';
import { ViewerProfile } from 'features/viewer';
import { Box, Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Main() {
    const { data: viewerData } = viewerApi.handleGetViewer();

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.card}>
                <ViewerProfile />
            </div>
            {viewerData?.companies?.length ? null : <BindCompany />}
        </Box.Animated>
    );
}

export default Main;
