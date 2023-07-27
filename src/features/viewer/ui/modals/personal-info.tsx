import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { PersonalInfoModalView, useUserStore } from 'entities/user';
import { ViewerApi, yup, useViewerStore } from 'entities/viewer';
import { useInput, useModal } from 'shared/hooks';
import { Modal } from 'shared/ui';

type Props = {
    direction?: 'column' | 'row';
};

function ViewerPersonalInfoModal(props: Props) {
    const { direction } = props;

    const { data, isLoading } = ViewerApi.handleGetViewer();

    const personalInfoModal = useModal();

    const openPersonalInfoModal = useViewerStore.use.openPersonalInfoModal();
    const setOpenPersonalInfoModal = useViewerStore.use.setOpenPersonalInfoModal();

    // const close = () => {
    //     setOpenContactsModal(true);
    //     setOpenAddContactsModal(false);
    // };

    useEffect(() => {
        openPersonalInfoModal ? personalInfoModal.open() : personalInfoModal.close();
    }, [openPersonalInfoModal]);

    return (
        <Modal {...personalInfoModal} onClose={() => setOpenPersonalInfoModal(false)}>
            <PersonalInfoModalView isViewer user={data?.data?.data} />
        </Modal>
    );
}

export default ViewerPersonalInfoModal;
