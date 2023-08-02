import React from 'react';
import { useNavigate } from 'react-router-dom';

import { viewerApi, InitialFillingProfileStep1View, yup } from 'entities/viewer';
import { useInput } from 'shared/hooks';

function InitialFillingProfileStep1() {
    const navigate = useNavigate();

    const { data, isLoading } = viewerApi.handleGetViewer();
    const handleCheckNickname = viewerApi.handleCheckNickname();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const nicknameInput = useInput({
        yupSchema: yup.checkNickname,
    });

    const onsubmit = async () => {
        const { error } = await nicknameInput.asyncValidate();
        const { exists } = await handleCheckNickname({ nickname: nicknameInput.value });
        if (exists && data?.data?.data.nickname !== nicknameInput.value) {
            return nicknameInput.setError('Такой никнейм уже занят');
        }
        if (!error) {
            handleEditProfile(
                { nickname: nicknameInput.value },
                {
                    onSuccess: () => navigate('step2'),
                }
            );
        }
    };

    return <InitialFillingProfileStep1View nicknameInput={nicknameInput} handleSubmit={onsubmit} viewer={data?.data?.data} />;
}

export default InitialFillingProfileStep1;
