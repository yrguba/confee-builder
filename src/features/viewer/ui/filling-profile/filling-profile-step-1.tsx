import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useViewerStore, ViewerApi, FillingProfileStep1View, yup } from 'entities/viewer';
import { ErrorsNames } from 'shared/enums';
import { useError } from 'shared/hooks';

function FillingProfileStep1() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useViewerStore.use.socketAction();

    const { data, isLoading } = ViewerApi.handleGetViewer();
    const handleCheckNickname = ViewerApi.handleCheckNickname();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();

    const [error, setError] = useState('');

    const onsubmit = (nickname: string) => {
        yup.checkNickname
            .validate({ nickname })
            .then(async () => {
                setError('');
                const { exists } = await handleCheckNickname({ nickname });
                if (exists) {
                    setError(ErrorsNames.nickname_exists);
                } else {
                    handleEditProfile(
                        { nickname },
                        {
                            onSuccess: () => navigate('step2'),
                        }
                    );
                }
            })
            .catch((err) => {
                setError(err.errors[0]);
            });
    };

    return <FillingProfileStep1View clearError={() => setError('')} handleSubmit={onsubmit} error={error} viewer={data?.data?.data} />;
}

export default FillingProfileStep1;
