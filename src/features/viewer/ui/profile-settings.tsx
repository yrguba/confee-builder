import moment from 'moment/moment';
import React from 'react';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, SettingsProfileView } from 'entities/viewer';
import { useRouter, useYup } from 'shared/hooks';
import { getFormData } from 'shared/lib';
import { Input } from 'shared/ui';

function ProfileSettings() {
    const { navigate } = useRouter();

    const { data: viewerData } = viewerApi.handleGetViewer();
    const user = viewerData?.data.data.user;

    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();
    const { mutate: handleEditProfile } = viewerApi.handleEditProfile();
    const { mutate: handClearBirthday } = viewerApi.handClearBirthday();

    const yup = useYup();

    const firstNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: user?.first_name,
        realtimeValidate: true,
        onFocus: (value) => {
            if (!value && !firstNameInput.error) {
                firstNameInput.value ? handleEditProfile({ first_name: firstNameInput.value }) : firstNameInput.reload();
            }
        },
    });

    const lastNameInput = Input.use({
        yupSchema: yup.checkName,
        initialValue: user?.last_name,
        realtimeValidate: true,
        onFocus: (value) => {
            if (!value && !lastNameInput.error) {
                handleEditProfile({ last_name: lastNameInput.value });
            }
        },
    });

    const birthInput = Input.use({
        initialValue: user?.birth?.split(' ')[0] || '',
        callback: (value) => {
            const currentDateTs = moment().unix();
            const selectDateTs = moment(String(value)).unix();
            const selectYear = Number(String(value).split('-')[0]);
            const currentDate = moment().format('DD.MM.YYYY');
            if (!value) {
                return '';
            }
            if (selectDateTs > currentDateTs) {
                return birthInput.setError(`Значение должно быть ${currentDate} или раньше`);
            }
            if (selectYear < 1990) {
                return birthInput.setError(`Значение должно быть 01.01.1990 или позже`);
            }
            birthInput.setError(``);
        },
        onFocus: (value) => {
            if (!value && !birthInput.value) {
                return handClearBirthday();
            }
            if (!value && !birthInput.error) {
                const birthDate: any = Math.floor(new Date(birthInput.value).getTime() / 1000);
                firstNameInput.value ? handleEditProfile({ birth: birthDate }) : birthInput.reload();
            }
        },
    });

    const nicknameInput = Input.use({
        yupSchema: yup.checkNickname,
        initialValue: user?.nickname,
        realtimeValidate: true,
        onFocus: (value) => {
            if (!value && !firstNameInput.error) {
                firstNameInput.value ? handleEditProfile({ nickname: nicknameInput.value }) : nicknameInput.reload();
            }
        },
    });

    const aboutInput = Input.use({
        initialValue: user?.about,
        onFocus: (value) => {
            if (!value && !aboutInput.error && aboutInput.value !== user?.about) {
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
            user={user}
            back={() => navigate('/profile')}
        />
    );
}

export default ProfileSettings;
