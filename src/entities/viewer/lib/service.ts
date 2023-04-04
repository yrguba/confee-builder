import { useQueryClient } from '@tanstack/react-query';

import { Viewer } from '../model/types';

class ViewerService {
    getId() {
        const queryClient = useQueryClient();
        const data: { data: { data: Viewer } } | undefined = queryClient.getQueryData(['get-viewer']);
        return data ? data.data.data.id : null;
    }
}

export default new ViewerService();
