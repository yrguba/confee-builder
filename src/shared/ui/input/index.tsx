import React, { ForwardRefExoticComponent } from 'react';

import * as InputTypes from './types';
import InputBase from './ui/base';
import Password from './ui/password';
import Search from './ui/search';
import Textarea from './ui/textarea';

type CompoundedComponent = ForwardRefExoticComponent<InputTypes.BaseInputProps> & {
    Password: typeof Password;
    Search: typeof Search;
    Textarea: typeof Textarea;
};

const Input = InputBase as CompoundedComponent;

Input.Password = Password;
Input.Search = Search;
Input.Textarea = Textarea;

export { InputTypes };
export default Input;
