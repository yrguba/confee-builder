import cn from 'classnames';
import cnBind from 'classnames/bind';
import { AnimatePresence, motion } from 'framer-motion';
import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';

import { Button, Icons } from 'shared/ui';

import Confirm from './confirm';
import styles from './styles.module.scss';
import { ModalHookReturned } from '../hooks/useModal';

type Props = {
    onOk?: () => void;
    onClose?: () => void;
} & ModalHookReturned;

function Modal(props: Props) {
    const { isOpen, toggle, name, onOk, onClose } = props;

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

    const animation = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return modal_root
        ? ReactDOM.createPortal(
              <AnimatePresence>
                  {isOpen && (
                      <motion.div {...animation} className={styles.mask} onClick={(e) => close(e)}>
                          <div className={classes} onClick={(e) => e.stopPropagation()}>
                              <div className={styles.header}>
                                  <div className={styles.header__title}>dwad</div>
                                  <div className={styles.header__closeIcon} onClick={(e) => close(e)}>
                                      <Icons.Base variants="close" />
                                  </div>
                              </div>
                              <div className={styles.content}>{dictionary[name].element}</div>
                              <div className={styles.footer}>
                                  <Button onClick={(e) => close(e)}>отмена</Button>
                                  <Button onClick={onOk}>готово</Button>
                              </div>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>,
              modal_root
          )
        : null;
}

export default Modal;
