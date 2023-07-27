import React, { ForwardRefExoticComponent } from 'react';

import * as AvatarTypes from './types';
import Base from './ui/base';
import AvatarChange from './ui/change';

type CompoundedComponent = ForwardRefExoticComponent<AvatarTypes.AvatarProps> & {
    Change: typeof AvatarChange;
};

const Avatar = Base as CompoundedComponent;

Avatar.Change = AvatarChange;

export { AvatarTypes };
export default Avatar;
