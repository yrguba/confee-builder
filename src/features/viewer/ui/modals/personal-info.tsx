import React, { useEffect } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { PersonalInfoModalView } from 'entities/user';
import { viewerApi, useViewerStore, viewerTypes } from 'entities/viewer';
import { getFormData } from 'shared/lib';
import { Modal } from 'shared/ui';

function ViewerPersonalInfoModal() {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();

    const personalInfoModal = Modal.use<viewerTypes.ModalName>('viewer-personal-info');
    const changeNameModal = Modal.use<viewerTypes.ModalName>('change-name');
    const changeAboutMeModal = Modal.use<viewerTypes.ModalName>('change-about-me');
    const changeNicknameModal = Modal.use<viewerTypes.ModalName>('change-nickname');
    const changePhoneModal = Modal.use<viewerTypes.ModalName>('change-phone');
    const changeEmailModal = Modal.use<viewerTypes.ModalName>('change-email');
    const changeBirthModal = Modal.use<viewerTypes.ModalName>('change-birth');

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            handleAddAvatar({ file: getFormData('images', data.files[0].file) });
        },
    });

    const getScreenshot = (data: string) => {
        handleAddAvatar({ file: getFormData('images', data) });
    };

    const getChangeModals = (modalName: viewerTypes.ModalName, disabled?: boolean) => {
        switch (modalName) {
            case 'change-name':
                changeNameModal.open();
                break;
            case 'change-about-me':
                changeAboutMeModal.open();
                break;
            case 'change-nickname':
                changeNicknameModal.open();
                break;
            case 'change-phone':
                changePhoneModal.open();
                break;
            case 'change-email':
                changeEmailModal.open();
                break;
            case 'change-birth':
                changeBirthModal.open();
        }
    };

    return (
        <Modal {...personalInfoModal}>
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
