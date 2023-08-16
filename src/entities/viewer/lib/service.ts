import { appTypes } from 'entities/app';
import { useStorage } from 'shared/hooks';

class ViewerService {
    getId(): number | null {
        const storage = useStorage<appTypes.ValuesInStorage>();
        return Number(storage.get('viewer_id')) || null;
    }
}

export default new ViewerService();
