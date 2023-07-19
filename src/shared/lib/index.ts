import * as handlers from './handlers';
import reactionConverter from './reaction-converter';
import * as cookie from './storages/cookie';
import * as fs from './storages/fs';
import * as ls from './storages/ls';
import uniqueArray from './unique-array';
import * as yup from './yup';

// лучше не обращаться напрямую, взаимодействовать с сторажем через сервис UniversalStorage.
const storages = { cookie, fs, ls };

export { storages, handlers, reactionConverter, uniqueArray, yup };
