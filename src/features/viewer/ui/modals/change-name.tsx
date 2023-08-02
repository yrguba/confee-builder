import React, { useEffect } from 'react';

import { viewerApi, ChangeNameModalView, yup, useViewerStore } from 'entities/viewer';

import { useModal } from '../../../../shared/hooks';
import { Modal, Input } from '../../../../shared/ui';

function ChangeNameModal() {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const changeNameModal = useModal();

    const firstNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: viewerData?.data?.data.first_name,
    });
    const lastNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: viewerData?.data?.data.last_name,
    });

    const openViewerModal = useViewerStore.use.openModal();
    const setViewerModal = useViewerStore.use.setOpenModal();

    const close = () => {
        setViewerModal('personal-info');
        firstNameInput.reload();
        lastNameInput.reload();
    };

    const onsubmit = async () => {
        const fnInput = await firstNameInput.asyncValidate();
        const lnInput = await lastNameInput.asyncValidate();
        if (!fnInput.error && !lnInput.error) {
            handleEditProfile(
                { first_name: fnInput.value, last_name: lnInput.value },
                {
                    onSuccess: close,
                }
            );
        }
    };

    useEffect(() => {
        openViewerModal === 'change-name' ? changeNameModal.open() : changeNameModal.close();
    }, [openViewerModal]);

    return (
        <Modal {...changeNameModal} onClose={close}>
            <ChangeNameModalView back={close} handleSubmit={onsubmit} inputs={{ lastName: lastNameInput, firstName: firstNameInput }} />;
        </Modal>
    );
}

export default ChangeNameModal;
