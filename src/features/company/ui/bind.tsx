import React from 'react';

import { BindCompanyView } from 'entities/company';
import { useRouter } from 'shared/hooks';

import { Modal } from '../../../shared/ui';
import { AuthAd } from '../../auth';

function BindCompany() {
    const authAdModal = Modal.use();

    const addClick = () => {};

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
