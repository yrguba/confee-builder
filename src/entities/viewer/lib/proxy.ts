import moment from 'moment/moment';

import { Viewer, ViewerProxy } from '../model/types';

function viewerProxy(viewer: Viewer | undefined): ViewerProxy | null {
    if (!viewer) return null;
    return new Proxy(viewer, {
        get(target, prop: keyof ViewerProxy, receiver) {
            switch (prop) {
                case 'full_name':
                    return `${target.first_name || ''} ${target.last_name || ''}`;

                case 'formatted_birth':
                    return moment(target.birth).format('LL');

                default:
                    return target[prop];
            }
        },
    }) as ViewerProxy;
}

export default viewerProxy;
