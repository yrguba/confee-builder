import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';

import { useMessageStore } from 'entities/message';
import { MainPageNavigation } from 'features/navbars';
import { ViewerCard } from 'features/viewer';
import { Icons, Box, Button } from 'shared/ui';

import styles from './styles.module.scss';

function HeaderMainPage() {
    const queryClient = useQueryClient();
    const params = useParams();
    // const newMessageTrigger = useMessageStore.use.newMessageTrigger();
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons.Logo variants="confee" />
            </div>
            <div className={styles.nav}>
                <MainPageNavigation />
            </div>
            <div className={styles.viewer}>
                {/* <ViewerCard /> */}
                <Button
                    onClick={() => {
                        queryClient.setQueriesData(['get-messages', params.chat_id], (old: any) => {
                            old.pages[old.pages.length - 1].data.data.push({ text: 'fefefffe', id: 999 });
                            // newMessageTrigger();
                            return old;
                        });
                    }}
                >
                    new msg
                </Button>
            </div>
        </div>
    );
}

export default HeaderMainPage;
