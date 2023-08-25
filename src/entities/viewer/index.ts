import viewerService from './lib/service';
import tokensService from './lib/tokens-service';
import viewerApi from './model/api';
import useViewerStore from './model/store';
import * as viewerTypes from './model/types';
import contactProxy from './proxy/contact';
import InitialFillingProfileStep1View from './ui/initial-filling-profile/step1';
import InitialFillingProfileStep2View from './ui/initial-filling-profile/step2';
import InitialFillingProfileStep3View from './ui/initial-filling-profile/step3';
import AddContactModalView from './ui/modals/add-contact';
import ChangeBirthModalView from './ui/modals/change-birth';
import ChangeNameModalView from './ui/modals/change-name';
import ChangeNickNameModalView from './ui/modals/change-nickname';
import ContactsModalView from './ui/modals/contacts';
import ViewerProfileView from './ui/profile';

export {
    useViewerStore,
    viewerTypes,
    viewerApi,
    viewerService,
    tokensService,
    contactProxy,
    InitialFillingProfileStep1View,
    InitialFillingProfileStep2View,
    InitialFillingProfileStep3View,
    ChangeNameModalView,
    ChangeNickNameModalView,
    ChangeBirthModalView,
    AddContactModalView,
    ContactsModalView,
    ViewerProfileView,
};
