import React, { ForwardRefExoticComponent } from 'react';

import * as CardTypes from './types';
import Base from './ui/base';

type CompoundedComponent = ForwardRefExoticComponent<CardTypes.CardProps> & {};

const Card = Base as CompoundedComponent;

export { CardTypes };
export default Card;
