import React, { useEffect } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { PersonalInfoModalView } from 'entities/user';
import { ViewerApi, useViewerStore } from 'entities/viewer';
import { useModal } from 'shared/hooks';
import { getFormData } from 'shared/lib';
import { Modal } from 'shared/ui';

function ViewerPersonalInfoModal() {
    const { data: viewerData } = ViewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = ViewerApi.handleAddAvatar();
    const personalInfoModal = useModal();

    const openViewerModal = useViewerStore.use.openModal();
    const setViewerModal = useViewerStore.use.setOpenModal();

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

    return (
        <Modal {...personalInfoModal} onClose={() => setViewerModal(null)}>
            <PersonalInfoModalView getScreenshot={getScreenshot} deleteFile={() => ''} selectFile={selectFile} isViewer user={viewerData?.data?.data} />
        </Modal>
    );
}

export default ViewerPersonalInfoModal;
