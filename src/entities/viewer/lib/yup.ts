import * as yup from 'yup';

import { enums } from 'entities/app';

export const checkNickname = yup
    .string()
    .required(enums.ErrorsNames.required)
    .matches(/^[a-zA-Z_0-9]+$/, enums.ErrorsNames.wrong_format)
    .min(5, enums.ErrorsNames.short_nickname)
    .max(20, enums.ErrorsNames.long_nickname);

export const checkName = yup.string().matches(/^[a-zA-Zа-яА-Я]*$/, enums.ErrorsNames.no_numbers);
export const checkRequired = yup.string().required(enums.ErrorsNames.required);
export const checkEmail = yup.string().email(enums.ErrorsNames.wrong_format);
export const checkBirthDate = yup.string().matches(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, enums.ErrorsNames.wrong_format);
