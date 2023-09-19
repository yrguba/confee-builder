import React from 'react';

import { BindCompanyView } from 'entities/company';

import { Modal } from '../../../shared/ui';
import { AuthAd } from '../../auth';

function BindCompany() {
    const authAdModal = Modal.use();

    return (
        <>
            <Modal {...authAdModal}>
                <AuthAd />
            </Modal>
            <BindCompanyView addClick={authAdModal.open} />
        </>
    );
}

export default BindCompany;
