import React, { useEffect } from 'react';

import { ViewerDossierView, ViewerApi, useViewerStore, TokensService } from 'entities/viewer';
import { useFileUploader } from 'shared/hooks';
import { Modal, useModal } from 'shared/ui';

function ViewerDossier() {
    const modalAvatar = useModal();

    useViewerStore.use.socketAction();

    const { data, isLoading } = ViewerApi.handleGetViewer();

    const { mutate: handleLogout } = ViewerApi.handleLogout();
    const { mutate: handleAddAvatar } = ViewerApi.handleAddAvatar();

    const { files, formData, open, clear } = useFileUploader({
        accept: 'image',
        formDataName: 'images',
    });

    const logoutClick = () => {
        handleLogout(null, {
            onSuccess: () => {
                TokensService.remove();
                window.location.reload();
            },
        });
    };

    const sendAvatar = () => {
        handleAddAvatar({ file: formData });
        clear();
    };

    useEffect(() => {
        if (files.length) {
            modalAvatar.open();
        } else {
            modalAvatar.close();
        }
    }, [files.length]);

    return (
        <>
            <ViewerDossierView viewer={data?.data?.data} logoutClick={logoutClick} replaceAvatarClick={open} loading={isLoading} />
        </>
    );
}

export default ViewerDossier;
