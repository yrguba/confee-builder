import moment from 'moment';

import { User, UserProxy } from '../model/types';

class ContactService {
    getUserNetworkStatus(user: UserProxy | null) {
        if (!user?.last_active) return 'Не в сети';
        if (user.is_online) return 'В сети';
        return user.formatted_last_active;
    }

    getFullName(data: { contact_name?: string | null; first_name: string | null; last_name: string | null }) {
        return data?.contact_name || `${data?.first_name || ''} ${data?.last_name || ''}`;
    }
}

export default new ContactService();
