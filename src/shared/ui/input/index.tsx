import React, { ForwardRefExoticComponent } from 'react';

import * as InputTypes from './model/types';
import use from './model/use';
import Base from './ui/base';
import InputCountries from './ui/countries';
import Textarea from './ui/textarea';

type CompoundedComponent = ForwardRefExoticComponent<InputTypes.BaseInputProps> & {
    use: typeof use;
    Textarea: typeof Textarea;
    Countries: typeof InputCountries;
};

const Input = Base as CompoundedComponent;
Input.use = use;

Input.Textarea = Textarea;
Input.Countries = InputCountries;
export { InputTypes };
export default Input;
