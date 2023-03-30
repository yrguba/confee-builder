import { useQueryClient } from '@tanstack/react-query';

class UserService {
    getUserById(id: string | number | undefined) {
        const queryClient = useQueryClient();
        console.log(queryClient.getQueryData(['get-info']));
    }
}

export default new UserService();
