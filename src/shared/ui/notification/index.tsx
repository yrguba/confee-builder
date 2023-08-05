import React, { ForwardRefExoticComponent } from 'react';

import * as Types from './model/types';
import use from './model/use';
import Base from './ui';

type CompoundedComponent = ForwardRefExoticComponent<Types.NotificationProps> & {
    use: typeof use;
};

const Notification = Base as CompoundedComponent;

Notification.use = use;

export { Types };
export default Notification;
