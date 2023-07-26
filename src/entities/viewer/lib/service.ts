import { ViewerApi } from '../index';
import { Viewer } from '../model/types';

class ViewerService {
    getViewer(): Viewer | null {
        const { data, isLoading } = ViewerApi.handleGetViewer();
        return data?.data?.data || null;
    }
}

export default new ViewerService();
