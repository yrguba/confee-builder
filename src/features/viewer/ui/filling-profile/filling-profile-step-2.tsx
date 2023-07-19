import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ViewerCardView, useViewerStore, ViewerApi, FillingProfileStep2View } from 'entities/viewer';

import { ErrorsNames } from '../../../../shared/enums';
import { yup } from '../../../../shared/lib';

function FillingProfileStep2() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useViewerStore.use.socketAction();
    const { data, isLoading } = ViewerApi.handleGetViewer();
    const handleCheckNickname = ViewerApi.handleCheckNickname();

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
                    navigate('step2');
                }
            })
            .catch((err) => {
                setError(err.errors[0]);
            });
    };
    return <FillingProfileStep2View clearError={() => setError('')} handleSubmit={onsubmit} error={error} viewer={data?.data?.data} />;
}

export default FillingProfileStep2;
