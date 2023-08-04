import React from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function ContactsPage() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            Раздел находится в разработке
        </Box.Animated>
    );
}

export default ContactsPage;
