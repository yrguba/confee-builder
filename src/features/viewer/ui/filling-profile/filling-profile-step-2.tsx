import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useViewerStore, ViewerApi, FillingProfileStep2View, yup } from 'entities/viewer';

function FillingProfileStep2() {
    const navigate = useNavigate();

    const { data } = ViewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();

    const [error, setError] = useState<{ firstName?: string; lastName?: string }>({});

    const onsubmit = (args: { first_name?: string; last_name?: string }) => {
        yup.checkName
            .validate({ name: args.first_name })
            .then(async () => {
                setError({ firstName: '' });
                yup.checkName
                    .validate({ name: args.last_name })
                    .then(async () => {
                        setError({ lastName: '' });
                        const body = Object.fromEntries(Object.entries(args).filter(([_, v]) => v));
                        handleEditProfile(body, {
                            onSuccess: () => navigate('/filling_profile/step3'),
                        });
                    })
                    .catch((err) => {
                        setError({ lastName: err.errors[0] });
                    });
            })
            .catch((err) => {
                setError({ firstName: err.errors[0] });
            });
    };
    return <FillingProfileStep2View setError={setError} handleSubmit={onsubmit} error={error} viewer={data?.data?.data} />;
}

export default FillingProfileStep2;
