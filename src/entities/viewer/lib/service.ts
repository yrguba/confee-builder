import { useQueryClient } from '@tanstack/react-query';

class ViewerService {
    getId() {
        const queryClient = useQueryClient();
        console.log(queryClient.getQueryData(['get-viewer']));
    }
}

export default new ViewerService();
