import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ViewerApi, InitialFillingProfileStep2View, yup } from 'entities/viewer';

import { useInput } from '../../../../shared/hooks';

function InitialFillingProfileStep2() {
    const navigate = useNavigate();

    const { data } = ViewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();

    const firstNameInput = useInput({
        yupSchema: yup.checkName,
    });
    const lastNameInput = useInput({
        yupSchema: yup.checkName,
    });

    const onsubmit = async () => {
        const fnInput = await firstNameInput.asyncValidate();
        const lnInput = await lastNameInput.asyncValidate();
        if (!fnInput.error && !lnInput.error) {
            handleEditProfile(
                { first_name: fnInput.value, last_name: lnInput.value },
                {
                    onSuccess: () => navigate('/filling_profile/step3'),
                }
            );
        }
    };
    return <InitialFillingProfileStep2View handleSubmit={onsubmit} viewer={data?.data?.data} inputs={{ lastName: lastNameInput, firstName: firstNameInput }} />;
}

export default InitialFillingProfileStep2;
