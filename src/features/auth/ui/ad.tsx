import React from 'react';
import { useUpdateEffect } from 'react-use';

import { AuthAdView } from 'entities/auth';
import { companyApi } from 'entities/company';
import { useEasyState, useYup } from 'shared/hooks';
import { Input, Modal, ModalTypes } from 'shared/ui';

import { EmployeeProfileModal } from '../../company';

function AuthAd(modal: ModalTypes.UseReturnedType) {
    const yup = useYup();

    const steps = useEasyState<'sendCode' | 'registration' | 'success'>('sendCode');

    const employeeProfileModal = Modal.use();

    const { mutate: handleSendCode } = companyApi.handleSendCode();
    const { mutate: handleBind } = companyApi.handleBind();

    const emailInput = Input.use({
        yupSchema: yup.checkEmail,
    });

    const codeInput = Input.use({
        onlyNumber: true,
        yupSchema: yup.checkNumber,
    });

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
                    onSuccess: () => {
                        employeeProfileModal.open({ successRegister: true });
                        steps.set('success');
                    },
                    onError: () => codeInput.setError('Неверный код'),
                }
            );
        }
    }, [codeInput.value]);

    return (
        <>
            <EmployeeProfileModal {...employeeProfileModal} onClose={modal.close} />
            {steps.value !== 'success' && <AuthAdView sendCode={sendCode} inputs={{ code: codeInput, email: emailInput }} steps={steps} />}
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal {...modal}>
            <AuthAd {...modal} />
        </Modal>
    );
}
