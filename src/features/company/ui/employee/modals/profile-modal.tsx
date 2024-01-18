import { QueryClient } from '@tanstack/react-query';
import React from 'react';

import { viewerApi } from 'entities/viewer';
import { Modal, ModalTypes } from 'shared/ui';

import { EmployeeProfileModalView, employeeProxy, ConfirmDeleteCorpAccModalView, companyApi } from '../../../../../entities/company';

const queryClient = new QueryClient();
function EmployeeProfileModal(modal: ModalTypes.UseReturnedType) {
    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleUnbind } = companyApi.handleUnbind();

    const employeeData = viewerData?.companies?.length ? viewerData?.companies[0]?.departments[0]?.employees[0] : null;
    const companyAvatar = viewerData?.companies?.length ? viewerData?.companies[0]?.avatar : '';

    const confirmDeleteModal = Modal.use();

    const confirmDelete = (value: boolean) => {
        if (value && employeeData?.companies[0]) {
            handleUnbind(
                { company_id: employeeData?.companies[0]?.id },
                {
                    onSuccess: () => {
                        window.location.reload();
                    },
                }
            );
        } else {
            confirmDeleteModal.close();
        }
    };

    return (
        <>
            <Modal {...confirmDeleteModal} closeIcon={false}>
                <ConfirmDeleteCorpAccModalView confirmDelete={confirmDelete} />
            </Modal>
            <EmployeeProfileModalView
                openDeleteAccModal={confirmDeleteModal.open}
                employeeData={employeeProxy(employeeData)}
                companyAvatar={companyAvatar as string}
            />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <EmployeeProfileModal {...modal} />
        </Modal>
    );
}
