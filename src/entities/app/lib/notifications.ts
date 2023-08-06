import useNotificationStore from 'shared/ui/notification/model/store';

import { SocketIn } from '../model/types';

type Props = {
    event: SocketIn;
    ['string']: any;
};

function notifications(data: Props) {
    const a = useNotificationStore.use.setNotifications();
}
export default notifications;
