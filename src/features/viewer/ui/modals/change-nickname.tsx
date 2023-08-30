import React from 'react';

import { userApi } from 'entities/user';
import { viewerApi, ChangeNickNameModalView } from 'entities/viewer';
import { useYup } from 'shared/hooks';
import { Modal, Input, ModalTypes } from 'shared/ui';

function ChangeNicknameModal(modal: ModalTypes.UseReturnedType) {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const handleCheckNickname = userApi.handleCheckNickname();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();
    const yup = useYup();

    const nicknameInput = Input.use({
        yupSchema: yup.checkNickname,
        initialValue: viewerData?.data?.data.user.nickname,
    });

    const onsubmit = async () => {
        const { error } = await nicknameInput.asyncValidate();
        const { exists } = await handleCheckNickname({ nickname: nicknameInput.value });
        if (exists && viewerData?.data?.data.user.nickname !== nicknameInput.value) {
            return nicknameInput.setError('Такой никнейм уже занят');
        }
        if (!error) {
            handleEditProfile(
                { nickname: nicknameInput.value },
                {
                    onSuccess: modal.close,
                }
            );
        }
    };

    return <ChangeNickNameModalView back={modal.close} nicknameInput={nicknameInput} handleSubmit={onsubmit} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ChangeNicknameModal {...modal} />
        </Modal>
    );
}
