import React, { useEffect } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { PersonalInfoModalView, UserTypes } from 'entities/user';
import { ViewerApi, useViewerStore, ViewerTypes } from 'entities/viewer';
import { useModal } from 'shared/hooks';
import { getFormData } from 'shared/lib';
import { Modal } from 'shared/ui';

import { useAppStore } from '../../../../entities/app';

function ViewerPersonalInfoModal() {
    const { data: viewerData } = ViewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = ViewerApi.handleAddAvatar();
    const personalInfoModal = useModal();

    const setNotifications = useAppStore.use.setNotifications();
    const openViewerModal = useViewerStore.use.openModal();
    const setOpenViewerModal = useViewerStore.use.setOpenModal();

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            handleAddAvatar({ file: getFormData('images', data.files[0].file) });
        },
    });

    const getScreenshot = (data: string) => {
        handleAddAvatar({ file: getFormData('images', data) });
    };

    useEffect(() => {
        openViewerModal === 'personal-info' ? personalInfoModal.open() : personalInfoModal.close();
    }, [openViewerModal]);

    const getChangeModals = (modalName: ViewerTypes.ModalName, disabled?: boolean) => {
        disabled ? setNotifications({ text: 'Пока невозможно редактировать', scope: 'app', system: true }) : setOpenViewerModal(modalName);
    };

    return (
        <Modal {...personalInfoModal} onClose={() => setOpenViewerModal(null)}>
            <PersonalInfoModalView
                getChangeModals={getChangeModals}
                getScreenshot={getScreenshot}
                deleteFile={() => ''}
                selectFile={selectFile}
                isViewer
                user={viewerData?.data?.data}
            />
        </Modal>
    );
}

export default ViewerPersonalInfoModal;
