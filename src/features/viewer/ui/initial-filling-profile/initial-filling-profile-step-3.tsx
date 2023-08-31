import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, InitialFillingProfileStep3View } from 'entities/viewer';
import { useYup } from 'shared/hooks';
import { Input } from 'shared/ui';

import { userApi } from '../../../../entities/user';
import { getFormData } from '../../../../shared/lib';

function InitialFillingProfileStep3() {
    const navigate = useNavigate();

    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();
    const { data: viewerData } = viewerApi.handleGetViewer();
    const handleCheckEmail = userApi.handleCheckEmail();
    const yup = useYup();
    const emailInput = Input.use({
        yupSchema: yup.checkEmail,
    });

    const birthInput = Input.use({});

    const [avatar, setAvatar] = useState<{ formData: FormData | null; fileUrl: string } | null>(null);

    const { open: selectFile } = useFileUploader({
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
        if (emailInput.value) {
            const checkEmail = await handleCheckEmail({ email: emailInput.value });
            if (checkEmail?.exists && viewerData?.user?.email !== checkEmail.identifier) {
                return emailInput.setError('Такая почта уже занята');
            }
        }
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
            avatar={avatar?.fileUrl}
            inputs={{ email: emailInput, birth: birthInput }}
        />
    );
}

export default InitialFillingProfileStep3;
