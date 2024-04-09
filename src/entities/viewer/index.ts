import viewerProxy from './lib/proxy';
import viewerService from './lib/service';
import viewerApi from './model/api';
import viewerStore, { ViewerStoreTypes } from './model/store';
import * as viewerTypes from './model/types';
import InitialFillingProfileStep1View from './ui/initial-filling-profile/step1';
import InitialFillingProfileStep2View from './ui/initial-filling-profile/step2';
import InitialFillingProfileStep3View from './ui/initial-filling-profile/step3';
import ViewerProfileView from './ui/profile';
import SettingsProfileView from './ui/settings-profile';

export type { ViewerStoreTypes };
export {
    viewerStore,
    viewerTypes,
    viewerApi,
    viewerService,
    viewerProxy,
    InitialFillingProfileStep1View,
    InitialFillingProfileStep2View,
    InitialFillingProfileStep3View,
    SettingsProfileView,
    ViewerProfileView,
};
