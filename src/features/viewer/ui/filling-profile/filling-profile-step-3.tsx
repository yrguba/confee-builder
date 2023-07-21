import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFileUploader from 'react-use-file-uploader';

import { ViewerCardView, useViewerStore, ViewerApi, FillingProfileStep3View, yup } from 'entities/viewer';

import { useInput } from '../../../../shared/hooks';

function FillingProfileStep3() {
    const navigate = useNavigate();

    const { data } = ViewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = ViewerApi.handleEditProfile();
    const { mutate: handleAddAvatar } = ViewerApi.handleAddAvatar();
    console.log(data);
    const emailInput = useInput({
        yupSchema: yup.checkEmail,
    });

    const birthInput = useInput({});

    const [avatar, setAvatar] = useState<{ formData: FormData | null; fileUrl: string } | null>(null);

    const { open: selectFile, formData } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            const fd = new FormData();
            fd.append('images', data.files[0].file);
            setAvatar({ formData: fd, fileUrl: data.files[0].fileUrl });
        },
    });

    const makePhoto = (data: string) => {
        const fd = new FormData();
        fd.append('images', data);
        setAvatar({ formData: fd, fileUrl: data });
    };

    const onsubmit = async () => {
        const { error: emailError, value: email } = await emailInput.asyncValidate();
        const { error: birthError, value: birth } = await birthInput.asyncValidate();
        if (!emailError && !birthError) {
            const birthDate: any = Math.floor(new Date(birth).getTime() / 1000);
            handleEditProfile({ email, birth: birthDate });
            if (avatar) {
                handleAddAvatar(
                    { file: avatar.formData },
                    {
                        onSuccess: (data: any) => {
                            handleEditProfile({ avatar: data?.data?.avatar?.path || '' });
                        },
                    }
                );
            }
            navigate('/main');
        }
    };

    return (
        <FillingProfileStep3View
            makePhoto={makePhoto}
            deleteFile={() => setAvatar(null)}
            selectFile={selectFile}
            handleSubmit={onsubmit}
            viewer={data?.data?.data}
            avatar={avatar?.fileUrl}
            inputs={{ email: emailInput, birth: birthInput }}
        />
    );
}

export default FillingProfileStep3;
