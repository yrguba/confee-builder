import React, { ForwardRefExoticComponent } from 'react';

import * as ModalTypes from './model/types';
import use from './model/use';
import Base from './ui';

type CompoundedComponent = ForwardRefExoticComponent<ModalTypes.ModalProps> & {
    use: typeof use;
};

const Modal = Base as CompoundedComponent;
Modal.use = use;

export { ModalTypes };
export default Modal;
