import React from 'react';

import { viewerApi, ChangeBirthModalView } from 'entities/viewer';
import { Modal, Input, ModalTypes } from 'shared/ui';

function ChangeBirthModal(modal: ModalTypes.UseReturnedType) {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const birthInput = Input.use({
        initialValue: viewerData?.birth?.split(' ')[0] || '',
    });

    const onsubmit = async () => {
        const { error: birthError, value: birth } = await birthInput.asyncValidate();
        if (!birthError) {
            const birthDate: any = Math.floor(new Date(birth).getTime() / 1000);
            handleEditProfile(
                { birth: birthDate },
                {
                    onSuccess: modal.close,
                }
            );
        }
    };

    return <ChangeBirthModalView handleSubmit={onsubmit} birthInput={birthInput} back={modal.close} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ChangeBirthModal {...modal} />
        </Modal>
    );
}
