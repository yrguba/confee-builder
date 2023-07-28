import React, { useEffect } from 'react';

import { ViewerApi, ChangeNameModalView, yup, useViewerStore } from 'entities/viewer';

import { PersonalInfoModalView } from '../../../../entities/user';
import { useInput, useModal } from '../../../../shared/hooks';
import { Modal } from '../../../../shared/ui';

function ChangeNameModal() {
    const { data: viewerData } = ViewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();

    const changeNameModal = useModal();

    const firstNameInput = useInput({
        yupSchema: yup.checkName,
        initialValue: viewerData?.data?.data.first_name,
    });
    const lastNameInput = useInput({
        yupSchema: yup.checkName,
        initialValue: viewerData?.data?.data.last_name,
    });

    const openViewerModal = useViewerStore.use.openModal();
    const setViewerModal = useViewerStore.use.setOpenModal();

    const close = () => {
        setViewerModal('personal-info');
        firstNameInput.clear();
        lastNameInput.clear();
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
