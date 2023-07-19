import * as yup from 'yup';

import { ErrorsNames } from 'shared/enums';

export const checkNickname = yup.object().shape({
    nickname: yup
        .string()
        .required(ErrorsNames.required)
        .matches(/^[a-zA-Z_0-9]+$/, ErrorsNames.wrong_format)
        .min(5, ErrorsNames.short_nickname)
        .max(20, ErrorsNames.long_nickname),
});
export type CheckNicknameType = yup.InferType<typeof checkNickname>;
