import { useStorage } from 'shared/hooks';

class ViewerService {
    getId(): number | null {
        const storage = useStorage();
        return Number(storage.get('viewer_id')) || null;
    }
}

export default new ViewerService();
