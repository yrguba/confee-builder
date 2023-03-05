import React from 'react';

import { Modal, useModal } from 'entities/modal';

import styles from './styles.module.scss';
import { Button } from '../../../../shared/ui';

function InfoNestedPage() {
    const confirmModal = useModal('confirm');

    return (
        <div className={styles.info}>
            <Modal {...confirmModal} onOk={() => console.log('wadw')} onClose={() => console.log('2')} />
            <Button onClick={confirmModal.toggle}>open</Button>
        </div>
    );
}

export default InfoNestedPage;
