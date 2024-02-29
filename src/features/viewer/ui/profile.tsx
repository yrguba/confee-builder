import React from 'react';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, viewerProxy, ViewerProfileView } from 'entities/viewer';
import { useEasyState, useRouter } from 'shared/hooks';

import { getFormData } from '../../../shared/lib';
import { Modal } from '../../../shared/ui';
import { AuthAdModal } from '../../auth';
import { EmployeeProfile, EmployeeProfileModal } from '../../company';
import { UserAvatarsSwiper } from '../../user';

function ViewerProfile() {
    const { navigate } = useRouter();
    const visibleSwiper = useEasyState(false);

    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const user = viewerData?.user;

    const viewer = viewerProxy(user);
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();

    const authCompanyModal = Modal.use();
    const employeeProfileModal = Modal.use();

    const confirmAddAvatar = Modal.useConfirm<{ img: string; file: File }>((value, callbackData) => {
        value &&
            callbackData?.img &&
            handleAddAvatar({
                file: getFormData('images', callbackData.file),
            });
    });

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            confirmAddAvatar.open({ img: data.files[0].fileUrl, file: data.files[0].file });
        },
    });

    const getScreenshot = (data: string) =>
        handleAddAvatar({
            file: getFormData('images', data),
        });

    return (
        <>
            <AuthAdModal {...authCompanyModal} />
            <EmployeeProfileModal {...employeeProfileModal} />
            <UserAvatarsSwiper userId={user?.id} onClose={() => visibleSwiper.set(false)} visible={visibleSwiper.value} />
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />

            <ViewerProfileView
                clickCompanyCard={employeeProfileModal.open}
                clickAvatar={() => visibleSwiper.set(true)}
                avatarActions={{
                    getScreenshot,
                    selectFile,
                    deleteFile: () => '',
                }}
                viewer={viewer}
                clickSettings={() => navigate('info_settings')}
                companies={viewerData?.companies || []}
                openAuthCompanyModal={authCompanyModal.open}
            />
        </>
    );
}

export default ViewerProfile;
