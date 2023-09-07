import React from 'react';

import { appService } from 'entities/app';
import * as AppFeatures from 'features/app';
import { ProfileSettings } from 'features/viewer';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function InfoSettings() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.item}>
                <ProfileSettings />
            </div>
        </Box.Animated>
    );
}

export default InfoSettings;
