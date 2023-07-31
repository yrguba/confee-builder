import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, InitialFillingProfileStep3View, yup } from 'entities/viewer';
import { useInput } from 'shared/hooks';

import { getFormData } from '../../../../shared/lib';

function InitialFillingProfileStep3() {
    const navigate = useNavigate();

    const { data } = viewerApi.handleGetViewer();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();

    const emailInput = useInput({
        yupSchema: yup.checkEmail,
    });

    const birthInput = useInput({});

    const [avatar, setAvatar] = useState<{ formData: FormData | null; fileUrl: string } | null>(null);

    const { open: selectFile, formData } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            setAvatar({ formData: getFormData('images', data.files[0].file), fileUrl: data.files[0].fileUrl });
        },
    });

    const getScreenshot = (data: string) => {
        setAvatar({ formData: getFormData('images', data), fileUrl: data });
    };

    const onsubmit = async () => {
        const { error: emailError, value: email } = await emailInput.asyncValidate();
        const { error: birthError, value: birth } = await birthInput.asyncValidate();
        if (!emailError && !birthError) {
            const birthDate: any = Math.floor(new Date(birth).getTime() / 1000);
            handleEditProfile({ email, birth: birthDate });
            if (avatar) {
                handleAddAvatar({ file: avatar.formData });
            }
            navigate('/chats');
        }
    };

    return (
        <InitialFillingProfileStep3View
            getScreenshot={getScreenshot}
            deleteFile={() => setAvatar(null)}
            selectFile={selectFile}
            handleSubmit={onsubmit}
            viewer={data?.data?.data}
            avatar={avatar?.fileUrl}
            inputs={{ email: emailInput, birth: birthInput }}
        />
    );
}

export default InitialFillingProfileStep3;
