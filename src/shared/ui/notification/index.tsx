import React, { ForwardRefExoticComponent } from 'react';

import Manager from './model/manager';
import * as NotificationTypes from './model/types';
import Base from './ui';

type CompoundedComponent = ForwardRefExoticComponent<NotificationTypes.NotificationProps> & {
    Manager: typeof Manager;
};

const Notification = Base as CompoundedComponent;

Notification.Manager = Manager;

export { NotificationTypes };
export default Notification;
