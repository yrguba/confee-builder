import React from 'react';

import { Button, Image, Title } from 'shared/ui/index';

import styles from './styles.module.scss';
import { useUpdateEffect } from '../../../../hooks';
import { ConfirmModalProps } from '../../model/types';
import Modal from '../base';

function ConfirmModal(props: ConfirmModalProps) {
    const { isOpen, close, title, onClose, closeText, okText, subtitle, callbackData, callback, open } = props;

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
        <Modal payload={callbackData} closeIcon={false} isOpen={isOpen} open={() => ''} close={() => ''} onClose={() => click(false)}>
            <div className={styles.wrapper}>
                <div className={styles.body}>
                    <Title textAlign="center" textWrap variant="H2">
                        {title}
                    </Title>
                    {callbackData?.value?.img && <Image url={callbackData?.value?.img} />}
                    {subtitle && <Title variant="H2">{subtitle}</Title>}
                </div>
                <div className={styles.footer}>
                    <Button onClick={() => click(false)}>{closeText || 'Отмена'}</Button>
                    <Button onClick={() => click(true)}>{okText || 'Готово'}</Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
