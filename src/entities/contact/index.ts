import contactProxy from './lib/proxy';
import contactService from './lib/service';
import ContactApi from './model/api';
import contactGateway from './model/gateway';
import useContactStore from './model/store';
import * as contactTypes from './model/types';
import ContactsListView from './ui/list';
import AddContactModalView from './ui/modals/add-contact';

export { contactService, useContactStore, contactTypes, ContactApi, contactProxy, ContactsListView, contactGateway, AddContactModalView };
