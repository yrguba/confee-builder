import React from 'react';

import { Button, Title } from 'shared/ui/index';

import styles from './styles.module.scss';
import { useUpdateEffect } from '../../../../hooks';
import { ConfirmModalProps } from '../../model/types';
import Modal from '../base';

function ConfirmModal(props: ConfirmModalProps) {
    const { isOpen, close, title, onClose, closeText, okText, subtitle, callback, open } = props;

    const click = (value: boolean) => {
        callback(value);
        onClose && onClose();
        close();
    };

    useUpdateEffect(() => {
        if (!isOpen && onClose) {
            onClose();
        }
    }, [isOpen]);

    return (
        <Modal closeIcon={false} isOpen={isOpen} open={() => ''} close={() => ''} onClose={() => click(false)}>
            <div className={styles.wrapper}>
                <div className={styles.body}>
                    <Title variant="H2">{title}</Title>
                    {subtitle && <Title variant="H2">{subtitle}</Title>}
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => click(false)}>{closeText}</Button>
                    <Button onClick={() => click(true)}>{okText}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
