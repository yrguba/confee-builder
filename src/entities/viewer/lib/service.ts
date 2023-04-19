import { useQueryClient } from '@tanstack/react-query';

import { UniversalStorage } from 'shared/services';

import { Viewer } from '../model/types';

class ViewerService {
    getViewer(): Viewer | null {
        const viewer = UniversalStorage.localStorageGet('viewer');
        return viewer || null;
    }
}

export default new ViewerService();
