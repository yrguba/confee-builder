import React from 'react';

import { ViewerDossierView, ViewerApi } from 'entities/viewer';
import { TokenService } from 'shared/services';

function ViewerDossier() {
    const { data, isLoading } = ViewerApi.handleGetViewer();

    const { mutate: handleLogout } = ViewerApi.handleLogout();

    const logoutClick = () => {
        handleLogout(null, {
            onSuccess: () => {
                TokenService.remove().then(() => {
                    window.location.reload();
                });
            },
        });
    };

    const replaceAvatarClick = () => {};

    return <ViewerDossierView viewer={data?.data?.data} logoutClick={logoutClick} replaceAvatarClick={replaceAvatarClick} loading={isLoading} />;
}

export default ViewerDossier;
