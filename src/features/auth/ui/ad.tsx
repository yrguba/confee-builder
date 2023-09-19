import React from 'react';

import { AuthAdView } from 'entities/auth';
import { companyApi } from 'entities/company';
import { useEasyState, useYup } from 'shared/hooks';
import { Input } from 'shared/ui';

function AuthAd() {
    const yup = useYup();

    const { mutate: handleBind } = companyApi.handleBind();

    const email = Input.use({
        yupSchema: yup.checkEmail,
        realtimeValidate: true,
    });

    const bind = () => {
        handleBind({
            identifier: email.value,
            code: '12345',
        });
    };

    return <AuthAdView addClick={bind} emailInput={email} />;
}

export default AuthAd;
