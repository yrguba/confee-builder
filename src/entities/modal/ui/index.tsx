import React from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Button, Icons, AnimateBox } from 'shared/ui';

import Confirm from './confirm';
import styles from './styles.module.scss';
import { ModalHookReturned } from '../hooks/useModal';

type Props = {
    onOk?: () => void;
    onClose?: () => void;
    footer?: boolean;
    headerText?: string;
    okText?: string;
    closeText?: string;
} & ModalHookReturned;

function Modal(props: Props) {
    const { isOpen, toggle, name, onOk, onClose, closeText, okText, headerText, footer = true } = props;

    const modal_root = document.querySelector('#modal-root');

    const dictionary = {
        confirm: {
            title: 'Подтвердите действия',
            element: <Confirm />,
        },
    };

    const close = () => {
        toggle();
        onClose && onClose();
    };

    const classes = useStyles('modal');

    return modal_root
        ? ReactDOM.createPortal(
              <AnimateBox isVisible={isOpen} presence className={styles.mask} onClick={close}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.header}>
                          <div className={styles.header__title}>{headerText || dictionary[name].title}</div>
                          <div className={styles.header__closeIcon} onClick={close}>
                              <Icons.Base variants="close" />
                          </div>
                      </div>
                      <div className={styles.content}>{dictionary[name].element}</div>
                      {footer && (
                          <div className={styles.footer}>
                              <Button onClick={close}>{closeText || 'отмена'}</Button>
                              <Button onClick={onOk}>{okText || 'готово'}</Button>
                          </div>
                      )}
                  </div>
              </AnimateBox>,
              modal_root
          )
        : null;
}

export default Modal;
