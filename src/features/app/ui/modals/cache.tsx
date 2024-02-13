import React, { useEffect } from 'react';

import { CacheView } from 'entities/app';
import { Modal, ModalTypes } from 'shared/ui';

import { useFs } from '../../../../shared/hooks';

function CacheModal(modal: ModalTypes.UseReturnedType) {
    const { getMetadata } = useFs();

    useEffect(() => {
        // getMetadata({});
    }, []);

    return <CacheView />;
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <CacheModal {...modal} />
        </Modal>
    );
}
