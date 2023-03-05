import * as yup from 'yup';

import { ErrorsNames } from 'shared/enums';

export const loginSchema = yup.object({
    login: yup.string().required(ErrorsNames.required),
    password: yup
        .string()
        .required(ErrorsNames.required)
        .min(4, 'Пароль должен быть не короче 4х симвалов')
        .max(30, 'Пароль должен быть не длиннее 30ти симвалов'),
});
export type LoginType = yup.InferType<typeof loginSchema>;
