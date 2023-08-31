import moment from 'moment';

import { User } from '../model/types';

class ContactService {
    getUserNetworkStatus(user: User | null) {
        if (!user?.last_active) return 'Не в сети';
        if (user.is_online) return 'В сети';
        return moment(user.last_active).calendar();
    }

    getFullName(data: { contact_name?: string | null; first_name: string | null; last_name: string | null }) {
        return data?.contact_name || `${data?.first_name || ''} ${data?.last_name || ''}`;
    }
}

export default new ContactService();
