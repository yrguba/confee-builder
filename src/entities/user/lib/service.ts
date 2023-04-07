import { useQueryClient } from '@tanstack/react-query';

class UserService {
    getUserById(id: string | number | undefined) {
        const queryClient = useQueryClient();
    }
}

export default new UserService();
