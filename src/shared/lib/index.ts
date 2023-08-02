import crypto from './crypto';
import getEnding from './get-ending';
import getFormData from './get-form-data';
import getRandomString from './get-random-string';
import * as httpHandlers from './http-handlers';
import reactionConverter from './reaction-converter';
import * as cookie from './storages/cookie';
import * as fs from './storages/fs';
import * as ls from './storages/ls';
// лучше не обращаться напрямую, взаимодействовать с сторажем через сервис UniversalStorage.
const storages = { cookie, fs, ls };

export { storages, httpHandlers, getRandomString, reactionConverter, getFormData, getEnding, crypto };
