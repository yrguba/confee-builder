import moment from 'moment';

import { User } from '../model/types';

class UserService {
    getUserNetworkStatus(user: User | null) {
        if (!user?.last_active) return 'Не в сети';
        if (user.is_online) return 'В сети';
        return moment(user.last_active).calendar();
    }
}

export default new UserService();
