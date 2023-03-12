import * as yup from 'yup';

import { ErrorsNames } from 'shared/enums';

export const loginSchema = yup.object({
    login: yup.string().required(ErrorsNames.required),
    password: yup.string().required(ErrorsNames.required).min(4, ErrorsNames.short_password),
});
export type LoginType = yup.InferType<typeof loginSchema>;
