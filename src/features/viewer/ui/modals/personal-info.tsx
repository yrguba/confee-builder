import React, { useEffect } from 'react';
import useFileUploader from 'react-use-file-uploader';

import { PersonalInfoModalView } from 'entities/user';
import { viewerApi, useViewerStore, viewerTypes } from 'entities/viewer';
import { getFormData } from 'shared/lib';
import { Modal } from 'shared/ui';

function ViewerPersonalInfoModal() {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();

    const personalInfoModal = Modal.use<viewerTypes.Modals>('viewerPersonalInfo');
    const changeNameModal = Modal.use<viewerTypes.Modals>('changeName');
    const changeAboutMeModal = Modal.use<viewerTypes.Modals>('changeAboutMe');
    const changeNicknameModal = Modal.use<viewerTypes.Modals>('changeNickname');
    const changePhoneModal = Modal.use<viewerTypes.Modals>('changePhone');
    const changeEmailModal = Modal.use<viewerTypes.Modals>('changeEmail');
    const changeBirthModal = Modal.use<viewerTypes.Modals>('changeBirth');

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            const fd = getFormData('images', data.files[0].file);
            handleAddAvatar({ file: getFormData('images', data.files[0].file) });
        },
    });

    const getScreenshot = (data: string) => {
        handleAddAvatar({ file: getFormData('images', data) });
    };

    const getChangeModals = (modalName: keyof viewerTypes.Modals, disabled?: boolean) => {
        switch (modalName) {
            case 'changeName':
                changeNameModal.open();
                break;
            case 'changeAboutMe':
                changeAboutMeModal.open();
                break;
            case 'changeNickname':
                changeNicknameModal.open();
                break;
            case 'changePhone':
                changePhoneModal.open();
                break;
            case 'changeEmail':
                changeEmailModal.open();
                break;
            case 'changeBirth':
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
                user={viewerData}
            />
        </Modal>
    );
}

export default ViewerPersonalInfoModal;
