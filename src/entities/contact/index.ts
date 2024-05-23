import contactProxy from './lib/proxy';
import contactService from './lib/service';
import useContacts from './lib/useContacts';
import contactApi from './model/api';
import contactGateway from './model/gateway';
import contactStore from './model/store';
import * as contactTypes from './model/types';
import ContactsListView from './ui/list';
import AddContactModalView from './ui/modals/add-contact';
import ChaneNameContactModalView from './ui/modals/change-name';
import ContactProfileView from './ui/profile';

export {
    contactService,
    contactStore,
    contactTypes,
    contactApi,
    useContacts,
    contactProxy,
    ContactsListView,
    contactGateway,
    AddContactModalView,
    ContactProfileView,
    ChaneNameContactModalView,
};
