import React, { ForwardRefExoticComponent } from 'react';

import * as InputTypes from './types';
import InputBase from './ui/base';
import Password from './ui/password';
import Search from './ui/search';

type CompoundedComponent = ForwardRefExoticComponent<InputTypes.BaseInputProps> & {
    Password: typeof Password;
    Search: typeof Search;
};

const Input = InputBase as CompoundedComponent;

Input.Password = Password;
Input.Search = Search;

export { InputTypes };
export default Input;
