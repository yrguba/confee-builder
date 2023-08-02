import React, { ForwardRefExoticComponent } from 'react';

import * as NotificationTypes from './model/types';
import use from './model/use';
import Base from './ui';

type CompoundedComponent = ForwardRefExoticComponent<NotificationTypes.NotificationProps> & {
    use: typeof use;
};

const Notification = Base as CompoundedComponent;

Notification.use = use;

export { NotificationTypes };
export default Notification;
