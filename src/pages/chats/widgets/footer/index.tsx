import React from 'react';
import { useParams } from 'react-router';

import { MessageInput } from 'features/message';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Footer() {
    const params = useParams();

    return (
        <Box.Animated visible={!!params.chat_id} className={styles.wrapper}>
            <MessageInput />
        </Box.Animated>
    );
}

export default Footer;
