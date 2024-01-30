import React from 'react';
import { useNavigate } from 'react-router-dom';

import { viewerApi, InitialFillingProfileStep2View } from 'entities/viewer';
import { useYup } from 'shared/hooks';
import { Input } from 'shared/ui';

function InitialFillingProfileStep2() {
    const navigate = useNavigate();
    const yup = useYup();
    const { data: viewerData } = viewerApi.handleGetViewer();
    const user = viewerData?.data.data.user;

    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const firstNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: user?.first_name || '',
    });
    const lastNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: user?.last_name || '',
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
    return <InitialFillingProfileStep2View handleSubmit={onsubmit} inputs={{ lastName: lastNameInput, firstName: firstNameInput }} />;
}

export default InitialFillingProfileStep2;
