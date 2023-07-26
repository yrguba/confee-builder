import * as yup from 'yup';

import { ErrorsNames } from 'shared/enums';

export const checkNickname = yup
    .string()
    .required(ErrorsNames.required)
    .matches(/^[a-zA-Z_0-9]+$/, ErrorsNames.wrong_format)
    .min(5, ErrorsNames.short_nickname)
    .max(20, ErrorsNames.long_nickname);

export const checkName = yup.string().matches(/^[a-zA-Zа-яА-Я]*$/, ErrorsNames.no_numbers);
export const checkRequired = yup.string().required(ErrorsNames.required);
export const checkEmail = yup.string().email(ErrorsNames.wrong_format);
export const checkBirthDate = yup.string().matches(/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/, ErrorsNames.wrong_format);
