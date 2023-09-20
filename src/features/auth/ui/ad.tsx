import React from 'react';

import { AuthAdView } from 'entities/auth';
import { companyApi } from 'entities/company';
import { useEasyState, useYup } from 'shared/hooks';
import { Input } from 'shared/ui';

function AuthAd() {
    const yup = useYup();

    const steps = useEasyState<'sendCode' | 'registration'>('sendCode');

    const { mutate: handleSendCode } = companyApi.handleSendCode();
    const { mutate: handleBind } = companyApi.handleBind();

    const email = Input.use({
        yupSchema: yup.checkEmail,
    });

    const sendCode = async () => {
        const emailError = await email.asyncValidate();
        if (!emailError.error) {
            handleSendCode({ identifier: email.value }, { onSuccess: () => steps.set('registration') });
        }
    };

    return <AuthAdView sendCode={sendCode} emailInput={email} steps={steps} />;
}

export default AuthAd;
