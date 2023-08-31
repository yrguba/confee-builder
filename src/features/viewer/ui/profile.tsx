import React from 'react';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, ViewerProfileView } from 'entities/viewer';
import { getFormData } from 'shared/lib';
import { Modal } from 'shared/ui';

import ChangeBirthModal from './modals/change-birth';
import ChangeNameModal from './modals/change-name';
import ChangeNicknameModal from './modals/change-nickname';

function ViewerProfile() {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();

    const changeNameModal = Modal.use();
    const changeAboutMeModal = Modal.use();
    const changeNicknameModal = Modal.use();
    const changePhoneModal = Modal.use();
    const changeEmailModal = Modal.use();
    const changeBirthModal = Modal.use();

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            const fd = getFormData('images', data.files[0].file);
            handleAddAvatar({ file: fd });
        },
    });

    const getScreenshot = (data: string) => {
        handleAddAvatar({ file: getFormData('images', data) });
    };

    const modals = {
        openChangeNameModal: changeNameModal.open,
        openChangeAboutMeModal: changeAboutMeModal.open,
        openChangeNickname: changeNicknameModal.open,
        openChangePhone: changePhoneModal.open,
        openChangeEmail: changeEmailModal.open,
        openChangeBirth: changeBirthModal.open,
    };
    return (
        <>
            <ChangeBirthModal {...changeBirthModal} />
            <ChangeNameModal {...changeNameModal} />
            <ChangeNicknameModal {...changeNicknameModal} />
            <ViewerProfileView modals={modals} getScreenshot={getScreenshot} deleteFile={() => ''} selectFile={selectFile} user={viewerData?.user} />
        </>
    );
}

export default ViewerProfile;
