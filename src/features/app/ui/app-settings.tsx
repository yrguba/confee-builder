import React from 'react';

import { AppSettingsView } from 'entities/app';
import { tokensService, viewerApi } from 'entities/viewer';
import { useTheme, useStorage, useEasyState } from 'shared/hooks';

import { useUnmount } from '../../../shared/hooks';
import { Modal } from '../../../shared/ui';

function AppSettings() {
    const storage = useStorage();

    const isUpdate = useEasyState(false);

    const { mutate: handleLogout } = viewerApi.handleLogout();
    const { mutate: handleDeleteAccount } = viewerApi.handleDeleteAccount();

    const confirmLogout = Modal.useConfirm<{ messageId: number }>((value, callbackData) => {
        if (value && callbackData) {
            tokensService.remove();
            handleLogout(null);
            window.location.reload();
        }
    });

    const confirmDeleteAccount = Modal.useConfirm<{ messageId: number }>((value, callbackData) => {
        handleDeleteAccount(null, {
            onSuccess: () => {
                tokensService.remove();
                window.location.reload();
            },
        });
    });
    const not_scope = storage.get('notification');

    const notificationActive = useEasyState(!!not_scope, (value) => {
        value ? storage.set('notification', true) : storage.remove('notification');
        isUpdate.set(true);
    });

    const visibleLastActive = useEasyState(!!not_scope, (value) => {});
    const theme = useTheme();

    useUnmount(() => {
        isUpdate.value && window.location.reload();
    });

    return (
        <>
            <Modal.Confirm {...confirmLogout} title="Выйти из аккаунта" closeText="Отмена" okText="Выйти" />
            <AppSettingsView
                theme={theme}
                visibleLastActive={visibleLastActive}
                notificationActive={notificationActive}
                logout={confirmLogout.open}
                deleteAccount={confirmDeleteAccount.open}
            />
        </>
    );
}

export default AppSettings;
