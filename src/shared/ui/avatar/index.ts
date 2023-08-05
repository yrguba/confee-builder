import { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Base from './ui/base';
import AvatarChange from './ui/change';

type CompoundedComponent = ForwardRefExoticComponent<Types.BaseAvatarProps> & {
    Change: typeof AvatarChange;
};

const Avatar = Base as CompoundedComponent;

Avatar.Change = AvatarChange;

export { Types };
export default Avatar;
