import * as yup from 'yup';

export const checkNickname = yup
    .string()
    .required('Поле обязательно для заполнения')
    .matches(/^[a-zA-Z_0-9]+$/, 'неверный формат')
    .min(5, 'Слишком короткий nickname')
    .max(20, 'Слишком длинный nickname');

export const checkName = yup.string().matches(/^[a-zA-Zа-яА-Я]*$/, 'В этом поле не может быть цифр');
export const checkEmail = yup.string().email('неверный формат');
export const checkBirthDate = yup.string().matches(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, 'неверный формат');
