import React from 'react';

import { viewerApi, ChangeNameModalView } from 'entities/viewer';
import { useYup } from 'shared/hooks';
import { Modal, Input, ModalTypes } from 'shared/ui';

function ChangeNameModal(modal: ModalTypes.UseReturnedType) {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const yup = useYup();
    const firstNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: viewerData?.user?.first_name,
    });
    const lastNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: viewerData?.user?.last_name,
    });

    const onsubmit = async () => {
        const fnInput = await firstNameInput.asyncValidate();
        const lnInput = await lastNameInput.asyncValidate();
        if (!fnInput.error && !lnInput.error) {
            handleEditProfile(
                { first_name: fnInput.value, last_name: lnInput.value },
                {
                    onSuccess: modal.close,
                }
            );
        }
    };

    return (
        <>
            <ChangeNameModalView back={modal.close} handleSubmit={onsubmit} inputs={{ lastName: lastNameInput, firstName: firstNameInput }} />;
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <ChangeNameModal {...modal} />
        </Modal>
    );
}
