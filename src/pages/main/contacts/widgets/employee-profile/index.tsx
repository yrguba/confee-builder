import React from 'react';

import { EmployeeProfile } from 'features/company';
import { useRouter } from 'shared/hooks';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

export default function () {
    const { params } = useRouter();

    return (
        <Box.Animated visible key={params.contact_id} className={styles.wrapper}>
            <EmployeeProfile />
        </Box.Animated>
    );
}
