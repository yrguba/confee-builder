import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useWidthMediaQuery, useRouter, useEasyState, useStorage } from 'shared/hooks';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useMessageStore } from '../../../../entities/message';
import { SearchMessages } from '../../../../features/message';
import { useDebounce } from '../../../../shared/hooks';
import { Sidebar } from '../widgets';

function ChatsPage() {
    const { params } = useRouter();
    const storage = useStorage();
    const widthInStorage = storage.get('chat_list_width');

    const md = useWidthMediaQuery().to('md');
    const xl = useWidthMediaQuery().from('xl');

    const visibleSearchMessages = useMessageStore.use.visibleSearchMessages();

    const isResize = useEasyState(false);
    const sidebarWidth = useEasyState(md ? '100%' : widthInStorage || '375px');

    const isVisibleSidebar = () => {
        if (md) {
            return !params.chat_id;
        }
        return true;
    };

    const isVisibleOutlet = () => {
        if (md) {
            return !!params.chat_id;
        }
        return true;
    };

    useDebounce(() => storage.set('chat_list_width', sidebarWidth.value), 500, [sidebarWidth]);

    const resize = (e: any) => {
        if (isResize.value && e.clientX - 88 >= 375) {
            const size = `${e.clientX - 88}px`;
            sidebarWidth.set(size);
        }
    };

    useEffect(() => {
        sidebarWidth.set(md ? '100%' : widthInStorage || '375px');
    }, [md]);

    useEffect(() => {
        window.addEventListener('mouseup', () => {
            isResize.set(false);
        });
    }, []);

    return (
        <Box.Animated transition={{ duration: 0.1 }} presence={false} visible className={styles.wrapper}>
            {isVisibleSidebar() && (
                <div className={styles.sidebar} style={{ width: sidebarWidth.value }} onMouseMove={resize}>
                    <Sidebar />
                    <div className={styles.border} onMouseDown={() => isResize.set(true)} />
                </div>
            )}
            {isVisibleOutlet() && (
                <Box.Replace
                    className={styles.outlet}
                    onMouseMove={resize}
                    items={[
                        {
                            visible: !params.chat_id,
                            item: (
                                <Title textWrap primary={false} textAlign="center" variant="H2">
                                    Выберите чат, для начала диалога
                                </Title>
                            ),
                        },
                        {
                            visible: (!!params.chat_id && !visibleSearchMessages.value) || (!!params.chat_id && visibleSearchMessages.value && xl),
                            item: <Outlet />,
                        },
                        {
                            visible: !!params.chat_id && visibleSearchMessages.value && !xl,
                            item: <SearchMessages />,
                        },
                    ]}
                />
            )}
            <Box.Animated className={styles.search} animationVariant="autoWidth" visible={visibleSearchMessages.value && xl}>
                <SearchMessages />
            </Box.Animated>
        </Box.Animated>
    );
}

export default ChatsPage;
