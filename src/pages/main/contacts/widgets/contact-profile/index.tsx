import React from 'react';

import { ContactProfile } from 'features/contact';
import { useRouter } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

export default function () {
    const { params } = useRouter();

    return (
        <Box.Animated backBtn visible key={params.contact_id} className={styles.wrapper}>
            <ContactProfile />
        </Box.Animated>
    );
}
