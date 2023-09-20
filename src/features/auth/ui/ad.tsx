import React, { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { AuthAdView } from 'entities/auth';
import { companyApi } from 'entities/company';
import { useEasyState, useYup } from 'shared/hooks';
import { Input } from 'shared/ui';

function AuthAd() {
    const yup = useYup();

    const steps = useEasyState<'sendCode' | 'registration' | 'success'>('sendCode');

    const { mutate: handleSendCode } = companyApi.handleSendCode();
    const { mutate: handleBind } = companyApi.handleBind();

    const emailInput = Input.use({
        yupSchema: yup.checkEmail,
    });

    const codeInput = Input.use({});

    const sendCode = async () => {
        const emailError = await emailInput.asyncValidate();
        if (!emailError.error) {
            handleSendCode({ identifier: emailInput.value }, { onSuccess: () => steps.set('registration') });
        }
    };

    useUpdateEffect(() => {
        if (codeInput.value.length === 5) {
            handleBind(
                {
                    identifier: emailInput.value,
                    code: codeInput.value,
                },
                {
                    onSuccess: () => steps.set('success'),
                    onError: () => codeInput.setError('неверный код'),
                }
            );
        }
    }, [codeInput.value]);

    return <AuthAdView sendCode={sendCode} inputs={{ code: codeInput, email: emailInput }} steps={steps} />;
}

export default AuthAd;
