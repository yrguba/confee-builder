import React from 'react';
import { useNavigate } from 'react-router-dom';

import { viewerApi, InitialFillingProfileStep1View, yup } from 'entities/viewer';
import { Input } from 'shared/ui';

function InitialFillingProfileStep1() {
    const navigate = useNavigate();

    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const handleCheckNickname = viewerApi.handleCheckNickname();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const nicknameInput = Input.use({
        yupSchema: yup.checkNickname,
        initialValue: viewerData?.nickname,
    });

    const onsubmit = async () => {
        const { error } = await nicknameInput.asyncValidate();
        const { exists } = await handleCheckNickname({ nickname: nicknameInput.value });
        if (exists && viewerData?.nickname !== nicknameInput.value) {
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

    return <InitialFillingProfileStep1View nicknameInput={nicknameInput} handleSubmit={onsubmit} />;
}

export default InitialFillingProfileStep1;
