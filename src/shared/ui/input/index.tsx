import React, { ForwardRefExoticComponent } from 'react';

import * as InputTypes from './types';
import InputBase from './ui/base';
import InputCountries from './ui/countries';
import Textarea from './ui/textarea';

type CompoundedComponent = ForwardRefExoticComponent<InputTypes.BaseInputProps> & {
    Textarea: typeof Textarea;
    Countries: typeof InputCountries;
};

const Input = InputBase as CompoundedComponent;

Input.Textarea = Textarea;
Input.Countries = InputCountries;
export { InputTypes };
export default Input;
