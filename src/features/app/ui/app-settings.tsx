import React from 'react';
import { useUpdateEffect } from 'react-use';

import { AppSettingsView, appTypes } from 'entities/app';
import { tokensService, viewerApi } from 'entities/viewer';
import { useTheme, useStorage, useEasyState } from 'shared/hooks';

import { useUnmount } from '../../../shared/hooks';

function AppSettings() {
    const storage = useStorage();

    const isUpdate = useEasyState(false);

    const { mutate: handleLogout } = viewerApi.handleLogout();
    const { mutate: handleDeleteAccount } = viewerApi.handleDeleteAccount();

    const not_scope = storage.get('notification');

    const notificationActive = useEasyState(!!not_scope, (value) => {
        value ? storage.set('notification', true) : storage.remove('notification');
        isUpdate.set(true);
    });

    const visibleLastActive = useEasyState(!!not_scope, (value) => {
        // value ? storage.set('notification', true) : storage.remove('notification');
    });
    const theme = useTheme();

    const logout = () => {
        tokensService.remove();
        handleLogout(null);
        window.location.reload();
    };

    const deleteAccount = () => {
        handleDeleteAccount(null, {
            onSuccess: () => {
                tokensService.remove();
                window.location.reload();
            },
        });
    };

    useUpdateEffect(() => {
        isUpdate.set(true);
    });

    useUnmount(() => {
        isUpdate.value && window.location.reload();
    });

    return (
        <AppSettingsView
            theme={theme}
            visibleLastActive={visibleLastActive}
            notificationActive={notificationActive}
            logout={logout}
            deleteAccount={deleteAccount}
        />
    );
}

export default AppSettings;
