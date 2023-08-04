import { appTypes } from 'entities/app';
import { useStorage } from 'shared/hooks';

class ViewerService {
    storage = useStorage<appTypes.ValuesInStorage>();

    getId(): number | null {
        return Number(this.storage.get('viewer_id')) || null;
    }
}

export default new ViewerService();
