import React, { useEffect } from 'react';

import { SwiperModal } from 'entities/modal';
import { ViewerDossierView, ViewerApi, useViewerStore } from 'entities/viewer';
import { useFileUploader } from 'shared/hooks';
import { TokenService } from 'shared/services';
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
                TokenService.remove().then(() => {
                    window.location.reload();
                });
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
            <Modal {...modalAvatar} headerText="Изменить аватар чата ?" onClose={clear} onOk={sendAvatar}>
                <SwiperModal files={[{ url: files[0]?.fileUrl, size: 0, name: '', extension: 'img' }]} />
            </Modal>
        </>
    );
}

export default ViewerDossier;
