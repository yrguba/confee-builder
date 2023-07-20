import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFileUploader from 'react-use-file-uploader';

import { ViewerCardView, useViewerStore, ViewerApi, FillingProfileStep3View, yup } from 'entities/viewer';

function FillingProfileStep3() {
    const navigate = useNavigate();

    const { data } = ViewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();

    const [error, setError] = useState<string>('');
    const [avatar, setAvatar] = useState<{ formData: FormData | null; fileUrl: string } | null>(null);
    console.log(data);
    const { open: selectFile, formData } = useFileUploader({
        accept: 'image',
        formDataName: 'file',
        onAfterUploading: (data) => {
            const fd = new FormData();
            fd.append('file', data.files[0].file);
            setAvatar({ formData: fd, fileUrl: data.files[0].fileUrl });
        },
    });

    const makePhoto = (data: string) => {
        const fd = new FormData();
        fd.append('file', data);
        setAvatar({ formData: fd, fileUrl: data });
    };

    const onsubmit = (args: { email?: string; birthday?: Date }) => {
        yup.checkEmail
            .validate({ email: args.email })
            .then(async () => {
                setError('');
                handleEditProfile(args, {
                    // onSuccess: () => navigate('/filling_profile/step3'),
                });
            })
            .catch((err) => {
                setError(err.errors[0]);
            });
    };

    return (
        <FillingProfileStep3View
            makePhoto={makePhoto}
            deleteFile={() => setAvatar(null)}
            selectFile={selectFile}
            setError={setError}
            handleSubmit={onsubmit}
            error={error}
            viewer={data?.data?.data}
            avatar={avatar?.fileUrl}
        />
    );
}

export default FillingProfileStep3;
