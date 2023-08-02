import useNotificationStore from './store';
import { ManagerProps, Status } from './types';

function Manager() {
    const setNotifications = useNotificationStore.use.setNotifications();

    const set = (props: ManagerProps, status: Status) => {
        setNotifications({ ...props, status, id: new Date().valueOf() });
    };

    const info = (props: ManagerProps) => set(props, 'info');
    const success = (props: ManagerProps) => set(props, 'success');
    const warning = (props: ManagerProps) => set(props, 'warning');
    const error = (props: ManagerProps) => set(props, 'error');

    return {
        info,
        success,
        warning,
        error,
    };
}

export default Manager;
