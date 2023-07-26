import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import { User } from '../model/types';

class UserService {
    getUserById(id: string | number | undefined) {
        const queryClient = useQueryClient();
    }

    getUserNetworkStatus(user: User | null) {
        console.log(user);
        if (!user?.last_active) return null;
        if (user.is_online) return 'В сети';
        return moment(user.last_active).calendar();
    }
}

export default new UserService();
