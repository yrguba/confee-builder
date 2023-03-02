import * as yup from 'yup';

import { ErrorsNames } from 'shared/enums';

export const loginSchema = yup.object({
    login: yup.string().required(ErrorsNames.required),
    password: yup.string().required(ErrorsNames.required).min(4, 'Код должен быть не короче 4х цифр').max(30, 'Код должен быть не длиннее 30ти цифр'),
});
export type LoginType = yup.InferType<typeof loginSchema>;
