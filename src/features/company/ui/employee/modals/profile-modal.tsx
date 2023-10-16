import React from 'react';

import { viewerApi } from 'entities/viewer';
import { Modal, ModalTypes } from 'shared/ui';

import { EmployeeProfileModalView, employeeProxy } from '../../../../../entities/company';

function EmployeeProfileModal(modal: ModalTypes.UseReturnedType) {
    const { data: viewerData } = viewerApi.handleGetViewer();
    console.log(viewerData);

    const employeeData = viewerData?.companies?.length ? viewerData?.companies[0]?.departments[0]?.employees[0] : null;

    return <EmployeeProfileModalView employeeData={employeeProxy(employeeData)} />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <EmployeeProfileModal {...modal} />
        </Modal>
    );
}
