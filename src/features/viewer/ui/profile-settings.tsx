import React from 'react';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, SettingsProfileView } from 'entities/viewer';
import { useRouter, useYup } from 'shared/hooks';
import { getFormData } from 'shared/lib';
import { Input } from 'shared/ui';

function ProfileSettings() {
    const { navigate } = useRouter();

    const { data: viewerData } = viewerApi.handleGetViewer();
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();

    const yup = useYup();

    const firstNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: viewerData?.user?.first_name,
        realtimeValidate: true,
        onFocus: (value) => {
            if (!value && !firstNameInput.error) {
                firstNameInput.value ? handleEditProfile({ first_name: firstNameInput.value }) : firstNameInput.reload();
            }
        },
    });

    const lastNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: viewerData?.user?.last_name,
        realtimeValidate: true,
        onFocus: (value) => {
            if (!value && !lastNameInput.error) {
                handleEditProfile({ last_name: lastNameInput.value });
            }
        },
    });

    const birthInput = Input.use({
        initialValue: viewerData?.user?.birth?.split(' ')[0] || '',
        onFocus: (value) => {
            if (!value && !firstNameInput.error) {
                const birthDate: any = Math.floor(new Date(birthInput.value).getTime() / 1000);
                firstNameInput.value ? handleEditProfile({ birth: birthDate }) : birthInput.reload();
            }
        },
    });

    const nicknameInput = Input.use({
        yupSchema: yup.checkNickname,
        initialValue: viewerData?.user?.nickname,
        realtimeValidate: true,
        onFocus: (value) => {
            if (!value && !firstNameInput.error) {
                firstNameInput.value ? handleEditProfile({ nickname: nicknameInput.value }) : nicknameInput.reload();
            }
        },
    });

    const aboutInput = Input.use({
        initialValue: viewerData?.user?.about,
        onFocus: (value) => {
            if (!value && !aboutInput.error) {
                handleEditProfile({ about: aboutInput.value });
            }
        },
    });

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            const fd = getFormData('images', data.files[0].file);
            handleAddAvatar({ file: fd });
        },
    });

    const getScreenshot = (data: string) => {
        handleAddAvatar({ file: getFormData('images', data) });
    };

    return (
        <SettingsProfileView
            inputs={{
                firstName: firstNameInput,
                lastName: lastNameInput,
                birth: birthInput,
                nickname: nicknameInput,
                about: aboutInput,
            }}
            getScreenshot={getScreenshot}
            deleteFile={() => ''}
            selectFile={selectFile}
            user={viewerData?.user}
            back={() => navigate('/profile')}
        />
    );
}

export default ProfileSettings;
