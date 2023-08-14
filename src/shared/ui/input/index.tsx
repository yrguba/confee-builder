import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './model/types';
import use from './model/use';
import Base from './ui/base';
import Phone from './ui/phone';
import Textarea from './ui/textarea';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseInputProps> & {
    use: typeof use;
    Textarea: typeof Textarea;
    Phone: typeof Phone;
};

const Input = Base as CompoundedComponent;
Input.use = use;

Input.Textarea = Textarea;
Input.Phone = Phone;
export { Types };
export default Input;
