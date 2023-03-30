import React, { ForwardRefExoticComponent } from 'react';

import * as FilterTypes from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<FilterTypes.BaseFilterProps> & {};

const Filter = Base as CompoundedComponent;

export { FilterTypes };
export default Filter;
