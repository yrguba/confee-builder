import React, { useEffect } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { PersonalInfoModalView } from 'entities/user';
import { viewerApi, useViewerStore, viewerTypes } from 'entities/viewer';
import { getFormData } from 'shared/lib';
import { Modal } from 'shared/ui';

function ViewerPersonalInfoModal() {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();

    const personalInfoModal = Modal.use();

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

    const getChangeModals = (modalName: viewerTypes.ModalName, disabled?: boolean) => {
        disabled ? alert('Пока невозможно редактировать') : setOpenViewerModal(modalName);
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
