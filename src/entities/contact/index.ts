import contactProxy from './lib/proxy';
import contactService from './lib/service';
import contactApi from './model/api';
import contactGateway from './model/gateway';
import useContactStore from './model/store';
import * as contactTypes from './model/types';
import ContactsListView from './ui/list';
import AddContactModalView from './ui/modals/add-contact';
import ContactProfileView from './ui/profile';

export { contactService, useContactStore, contactTypes, contactApi, contactProxy, ContactsListView, contactGateway, AddContactModalView, ContactProfileView };
