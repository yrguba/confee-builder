import React from 'react';

import { viewerTypes, viewerApi, ChangeNickNameModalView, yup } from 'entities/viewer';
import { Modal, Input } from 'shared/ui';

function ChangeNicknameModal() {
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const handleCheckNickname = viewerApi.handleCheckNickname();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const changeNicknameModal = Modal.use<viewerTypes.ModalName>('change-nickname', { showPrevModalAfterClose: true });

    const nicknameInput = Input.use({
        yupSchema: yup.checkNickname,
        initialValue: viewerData?.nickname,
    });

    const close = () => {
        nicknameInput.reload();
        changeNicknameModal.close();
    };

    const onsubmit = async () => {
        const { error } = await nicknameInput.asyncValidate();
        const { exists } = await handleCheckNickname({ nickname: nicknameInput.value });
        if (exists && viewerData?.nickname !== nicknameInput.value) {
            return nicknameInput.setError('Такой никнейм уже занят');
        }
        if (!error) {
            handleEditProfile(
                { nickname: nicknameInput.value },
                {
                    onSuccess: () => close(),
                }
            );
        }
    };

    return (
        <Modal {...changeNicknameModal} onClose={close}>
            <ChangeNickNameModalView back={close} nicknameInput={nicknameInput} handleSubmit={onsubmit} />
        </Modal>
    );
}

export default ChangeNicknameModal;
