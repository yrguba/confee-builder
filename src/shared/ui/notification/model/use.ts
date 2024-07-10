import useNotificationStore from './store';
import { UseProps, Status } from './types';

function use() {
    const setNotifications = useNotificationStore.use.setNotifications();

    const set = (props: UseProps, status: Status) => {
        setNotifications({ ...props, status, id: new Date().valueOf() });
    };

    const info = (props: UseProps) => set({ ...props, system: true }, 'info');
    const success = (props: UseProps) => set(props, 'success');
    const warning = (props: UseProps) => set(props, 'warning');
    const error = (props: UseProps) => set({ ...props, system: true }, 'error');
    const inDev = () => set({ body: 'В разработке', title: 'Пока недоступно', system: true }, 'inDev');

    return {
        info,
        success,
        warning,
        error,
        inDev,
    };
}

export default use;
