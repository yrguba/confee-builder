import * as yup from 'yup';

export const required = yup.string().required('Поле обязательно для заполнения');
