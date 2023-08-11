import React from 'react';

import { Button, Title } from 'shared/ui/index';

import styles from './styles.module.scss';
import useModalStore from '../../model/store';
import Modal from '../base';

function ConfirmModal() {
    const openConfirmModal = useModalStore.use.openConfirmModal();
    const confirm = useModalStore.use.confirm();
    const setConfirmModalPayload = useModalStore.use.setConfirmModalPayload();
    const setOpenConfirmModal = useModalStore.use.setOpenConfirmModal();

    const click = (value: boolean) => {
        setConfirmModalPayload({ value, date: new Date().valueOf() });
        setOpenConfirmModal(false);
    };

    return (
        <Modal closeIcon={false} isOpen={!!openConfirmModal} open={() => ''} close={() => ''} onClose={() => click(false)}>
            <div className={styles.wrapper}>
                <div className={styles.body}>
                    <Title variant="H2">{confirm?.title}</Title>
                    {confirm?.subtitle && <Title variant="H2">{confirm?.subtitle}</Title>}
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => click(false)}>{confirm?.closeText}</Button>
                    <Button onClick={() => click(true)}>{confirm?.okText}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
