import { Storage } from 'entities/app';

class ViewerService {
    getId(): number | null {
        return Number(Storage.localStorageGet('viewerId')) || null;
    }
}

export default new ViewerService();
