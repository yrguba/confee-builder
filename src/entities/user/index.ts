import userProxy from './lib/proxy';
import userService from './lib/service';
import userApi from './model/api';
import userGateway from './model/gateway';
import userStore, { UserStoreTypes } from './model/store';
import * as userTypes from './model/types';
import UserInfoView from './ui/info';

export type { UserStoreTypes };
export { userService, userStore, userTypes, userApi, userProxy, userGateway, UserInfoView };
