import moment from 'moment/moment';

import { appService } from '../../app';
import { Viewer, ViewerProxy } from '../model/types';

function viewerProxy(viewer: Viewer | undefined): ViewerProxy | null {
    if (!viewer) return null;
    return new Proxy(viewer, {
        get(target, prop: keyof ViewerProxy, receiver): ViewerProxy[keyof ViewerProxy] {
            const { backBaseURL } = appService.getUrls();

            switch (prop) {
                case 'full_avatar_url':
                    return `${backBaseURL}${target.avatar}`;

                case 'full_name':
                    return `${target.first_name || ''} ${target.last_name || ''}`;

                case 'formatted_birth':
                    return target.birth ? moment(target.birth).format('LL') : null;

                default:
                    return target[prop];
            }
        },
    }) as ViewerProxy;
}

export default viewerProxy;
