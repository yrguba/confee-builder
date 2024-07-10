import React from 'react';
import { useWindowSize } from 'react-use';

import { Button, Image, Title } from 'shared/ui/index';

import styles from './styles.module.scss';
import { useUpdateEffect } from '../../../../hooks';
import { ConfirmModalProps } from '../../model/types';
import Modal from '../base';

function ConfirmModal(props: ConfirmModalProps) {
    const { isOpen, close, title, onClose, closeText, okText, subtitle, callbackData, callback, open } = props;

    const { height } = useWindowSize();

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
                    <div className={styles.header}>
                        <Title textAlign="center" textWrap variant="H2">
                            {title}
                        </Title>
                    </div>
                    {callbackData?.value?.img && <Image borderRadius maxHeight={`${height / 2}px`} url={callbackData?.value?.img} />}
                    {subtitle && (
                        <Title textAlign="center" textWrap variant="H4M" primary={false}>
                            {subtitle}
                        </Title>
                    )}
                </div>
                <div className={styles.btns}>
                    <Button height="44px" onClick={() => click(true)}>
                        {okText || 'Готово'}
                    </Button>
                    <Button height="44px" variant="secondary" onClick={() => click(false)}>
                        {closeText || 'Отмена'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
