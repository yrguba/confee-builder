import React from 'react';
import useFileUploader from 'react-use-file-uploader';

import { viewerApi, viewerProxy, ViewerProfileView } from 'entities/viewer';
import { useEasyState, useRouter } from 'shared/hooks';

import { getFormData } from '../../../shared/lib';
import { Modal } from '../../../shared/ui';
import { AuthAd } from '../../auth';
import { UserAvatarsSwiper } from '../../user';

function ViewerProfile() {
    const { navigate } = useRouter();
    const visibleSwiper = useEasyState(false);

    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();

    const viewer = viewerProxy(viewerData?.user);
    const { mutate: handleAddAvatar } = viewerApi.handleAddAvatar();
    const authCompanyModal = Modal.use();

    const confirmAddAvatar = Modal.useConfirm<{ img: string }>((value, callbackData) => {
        value &&
            callbackData?.img &&
            handleAddAvatar({
                file: getFormData('images', callbackData.img),
            });
    });

    const { open: selectFile } = useFileUploader({
        accept: 'image',
        onAfterUploading: (data) => {
            confirmAddAvatar.open({ img: data.files[0].fileUrl });
        },
    });
    const getScreenshot = (data: string) =>
        handleAddAvatar({
            file: getFormData('images', data),
        });

    return (
        <>
            <Modal {...authCompanyModal}>
                <AuthAd />
            </Modal>
            <UserAvatarsSwiper userId={viewerData?.user?.id} onClose={() => visibleSwiper.set(false)} visible={visibleSwiper.value} />
            <Modal.Confirm {...confirmAddAvatar} okText="Установить" title="Установить аватар" />

            <ViewerProfileView
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
