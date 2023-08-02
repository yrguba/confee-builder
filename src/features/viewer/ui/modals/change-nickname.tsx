import React, { useEffect } from 'react';

import { useViewerStore, viewerApi, ChangeNickNameModalView, yup } from 'entities/viewer';
import { Modal, Input } from 'shared/ui';

function ChangeNicknameModal() {
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const handleCheckNickname = viewerApi.handleCheckNickname();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const openViewerModal = useViewerStore.use.openModal();
    const setViewerModal = useViewerStore.use.setOpenModal();

    const changeNicknameModal = Modal.use();

    const nicknameInput = Input.use({
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
