import React, { useEffect } from 'react';

import { useViewerStore, ViewerApi, ChangeNickNameModalView, yup } from 'entities/viewer';
import { useInput, useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

function ChangeNicknameModal() {
    const { data: viewerData, isLoading } = ViewerApi.handleGetViewer();
    const handleCheckNickname = ViewerApi.handleCheckNickname();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();

    const openViewerModal = useViewerStore.use.openModal();
    const setViewerModal = useViewerStore.use.setOpenModal();

    const changeNicknameModal = useModal();

    const nicknameInput = useInput({
        yupSchema: yup.checkNickname,
        initialValue: viewerData?.data?.data.nickname,
    });

    const close = () => {
        nicknameInput.reload();
        setViewerModal('personal-info');
    };

    const onsubmit = async () => {
        const { error } = await nicknameInput.asyncValidate();
        const { exists } = await handleCheckNickname({ nickname: nicknameInput.value });
        if (exists && viewerData?.data?.data.nickname !== nicknameInput.value) {
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

    useEffect(() => {
        openViewerModal === 'change-nickname' ? changeNicknameModal.open() : changeNicknameModal.close();
    }, [openViewerModal]);

    return (
        <Modal {...changeNicknameModal} onClose={close}>
            <ChangeNickNameModalView back={close} nicknameInput={nicknameInput} handleSubmit={onsubmit} />
        </Modal>
    );
}

export default ChangeNicknameModal;
