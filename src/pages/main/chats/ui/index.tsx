import React from 'react';
import { Outlet } from 'react-router-dom';

import { chatGateway, useChatStore } from 'entities/chat';
import { useWidthMediaQuery, useRouter } from 'shared/hooks';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { messageGateway } from '../../../../entities/message';
import { userGateway } from '../../../../entities/user';
import Modals from '../modals';
import { Sidebar } from '../widgets';

function ChatsPage() {
    chatGateway();
    userGateway();
    messageGateway();

    const openRightSidebar = useChatStore.use.openRightSidebar();

    const { params } = useRouter();

    const { to } = useWidthMediaQuery();

    const isVisibleSidebar = () => {
        if (to('sm')) {
            return !params.chat_id && !openRightSidebar;
        }
        return true;
    };

    const isVisibleOutlet = () => {
        if (to('sm')) {
            return !!params.chat_id && !openRightSidebar;
        }
        return true;
    };

    return (
        <>
            <Modals />
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
        </>
    );
}

export default ChatsPage;
