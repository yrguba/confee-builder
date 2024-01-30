import React from 'react';
import { useNavigate } from 'react-router-dom';

import { userApi } from 'entities/user';
import { viewerApi, InitialFillingProfileStep1View } from 'entities/viewer';
import { useYup } from 'shared/hooks';
import { Input } from 'shared/ui';

function InitialFillingProfileStep1() {
    const navigate = useNavigate();

    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const user = viewerData?.data.data.user;

    const handleCheckNickname = userApi.handleCheckNickname();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const yup = useYup();

    const nicknameInput = Input.use({
        yupSchema: yup.checkNickname,
        initialValue: user?.nickname,
    });

    const onsubmit = async () => {
        const { error } = await nicknameInput.asyncValidate();
        if (error) return;
        const { exists } = await handleCheckNickname({ nickname: nicknameInput.value });
        if (exists && user?.nickname !== nicknameInput.value) {
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
