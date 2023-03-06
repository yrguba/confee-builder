import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Button, Icons, AnimateBox } from 'shared/ui';

import styles from './styles.module.scss';
import { ModalHookReturnedType } from './useModal';

type Props = {
    children: ReactNode;
    onOk?: () => void;
    onClose?: () => void;
    footer?: boolean;
    headerText?: string;
    okText?: string;
    closeText?: string;
} & ModalHookReturnedType;

function Modal(props: Props) {
    const { isOpen, open, close, children, onOk, onClose, closeText, okText, headerText, footer = true } = props;

    const modal_root = document.querySelector('#modal-root');

    const closeClick = () => {
        close();
        onClose && onClose();
    };

    const classes = useStyles(styles, 'modal');

    return modal_root
        ? ReactDOM.createPortal(
              <AnimateBox isVisible={isOpen} presence className={styles.mask} onClick={closeClick}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.header}>
                          <div className={styles.header__title}>{headerText}</div>
                          <div className={styles.header__closeIcon} onClick={closeClick}>
                              <Icons.Base variants="close" />
                          </div>
                      </div>
                      <div className={styles.content}>{children}</div>
                      {footer && (
                          <div className={styles.footer}>
                              <Button onClick={closeClick}>{closeText || 'отмена'}</Button>
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
