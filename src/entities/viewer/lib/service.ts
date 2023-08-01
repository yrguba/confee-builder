import { storage } from 'entities/app';

class ViewerService {
    getId(): number | null {
        return Number(storage.localStorageGet('viewerId')) || null;
    }
}

export default new ViewerService();
