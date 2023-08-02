import React, { useEffect } from 'react';

import { viewerApi, ChangeBirthModalView, viewerTypes } from 'entities/viewer';
import { Modal, Input } from 'shared/ui';

function ChangeBirthModal() {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const changeBirthModal = Modal.use<viewerTypes.ModalName>('change-birth');
    const personaModal = Modal.use<viewerTypes.ModalName>('change-birth');

    const birthInput = Input.use({
        initialValue: viewerData?.data?.data?.birth?.split(' ')[0] || '',
    });

    const close = () => {
        birthInput.reload();
        // setViewerModal('personal-info');
    };

    const onsubmit = async () => {
        const { error: birthError, value: birth } = await birthInput.asyncValidate();
        if (!birthError) {
            const birthDate: any = Math.floor(new Date(birth).getTime() / 1000);
            handleEditProfile(
                { birth: birthDate },
                {
                    onSuccess: close,
                }
            );
        }
    };

    return (
        <Modal {...changeBirthModal} onClose={close}>
            <ChangeBirthModalView handleSubmit={onsubmit} birthInput={birthInput} back={close} />;
        </Modal>
    );
}

export default ChangeBirthModal;
