import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';

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

    const close = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggle();
        onClose && onClose();
    };

    const classes = cn(
        cnBind.bind(styles)('modal', {
            //
        })
    );

    return modal_root
        ? ReactDOM.createPortal(
              <AnimateBox isVisible={isOpen} presence className={styles.mask} onClick={(e) => close(e)}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.header}>
                          <div className={styles.header__title}>{headerText || dictionary[name].title}</div>
                          <div className={styles.header__closeIcon} onClick={(e) => close(e)}>
                              <Icons.Base variants="close" />
                          </div>
                      </div>
                      <div className={styles.content}>{dictionary[name].element}</div>
                      {footer && (
                          <div className={styles.footer}>
                              <Button onClick={(e) => close(e)}>{closeText || 'отмена'}</Button>
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
