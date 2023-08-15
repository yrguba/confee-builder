import React from 'react';

import { Button, Title } from 'shared/ui/index';

import styles from './styles.module.scss';
import useModalStore from '../../model/store';
import Modal from '../base';

function ConfirmModal() {
    const confirmModal = useModalStore.use.confirmModal();

    const click = (value: boolean) => {
        confirmModal.set({ confirm: value, value: false });
    };

    return (
        <Modal payload={{}} closeIcon={false} isOpen={!!confirmModal.value} open={() => ''} close={() => ''} onClose={() => click(false)}>
            <div className={styles.wrapper}>
                <div className={styles.body}>
                    <Title variant="H2">{confirmModal?.props?.title}</Title>
                    {confirmModal?.props?.subtitle && <Title variant="H2">{confirmModal?.props?.subtitle}</Title>}
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => click(false)}>{confirmModal?.props?.closeText}</Button>
                    <Button onClick={() => click(true)}>{confirmModal?.props?.okText}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
