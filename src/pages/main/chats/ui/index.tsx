import React from 'react';
import { Outlet } from 'react-router-dom';

import { chatGateway } from 'entities/chat';
import { useWidthMediaQuery, useRouter, useRendersCount } from 'shared/hooks';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { messageGateway } from '../../../../entities/message';
import { userGateway } from '../../../../entities/user';
import { Sidebar } from '../widgets';

function ChatsPage() {
    chatGateway();
    userGateway();
    messageGateway();
    const { params } = useRouter();

    const { to, getCurrent } = useWidthMediaQuery();

    const isVisibleSidebar = () => {
        if (to('md')) {
            return !params.chat_id;
        }
        return true;
    };

    const isVisibleOutlet = () => {
        if (to('md')) {
            return !!params.chat_id;
        }
        return true;
    };

    return (
        <Box.Animated visible className={styles.wrapper}>
            {isVisibleSidebar() && (
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
            )}
            {isVisibleOutlet() && (
                <div className={styles.outlet}>
                    {!params.chat_id && (
                        <Title textWrap primary={false} textAlign="center" variant="H2">
                            Выберите чат, для начала диалога
                        </Title>
                    )}
                    <Outlet />
                </div>
            )}
        </Box.Animated>
    );
}

export default ChatsPage;
