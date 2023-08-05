import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './model/types';
import { use, useConfirm } from './model/use';
import Base from './ui/base';
import ConfirmModal from './ui/confirm';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseModalProps> & {
    use: typeof use;
    useConfirm: typeof useConfirm;
    Confirm: typeof ConfirmModal;
};

const Modal = Base as CompoundedComponent;
Modal.use = use;
Modal.useConfirm = useConfirm;

Modal.Confirm = ConfirmModal;

export { Types };
export default Modal;
