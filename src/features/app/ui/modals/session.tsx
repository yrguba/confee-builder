import React from 'react';

import { SessionsModalView } from 'entities/app';
import { viewerApi } from 'entities/viewer';
import { Modal, ModalTypes } from 'shared/ui';

function SessionModal(modal: ModalTypes.UseReturnedType) {
    const { data: sessions } = viewerApi.handleGetAllSessions();
    const { mutate: handleDeleteSessions } = viewerApi.handleDeleteSessions();

    const confirmDeleteSessions = Modal.useConfirm<string[]>((value, ids) => {
        if (value && ids?.length) {
            handleDeleteSessions({ session_ids: ids });
        }
    });

    const deleteSessions = (ids: string[]) => {
        confirmDeleteSessions.open(ids, {
            title: ids?.length > 1 ? 'Завершить сеансы' : 'Завершить сеанс',
            subtitle: ids?.length > 1 ? 'Вы действительно хотите завершить все сеансы кроме текущего?' : 'Вы действительно хотите завершить этот сеанс?',
        });
    };
    console.log(sessions);
    return (
        <>
            <Modal.Confirm {...confirmDeleteSessions} okText="Да, завершить" />
            <SessionsModalView sessions={sessions} deleteSessions={deleteSessions} />
        </>
    );
}

export default function (modal: ModalTypes.UseReturnedType) {
    return (
        <Modal centered={false} {...modal}>
            <SessionModal {...modal} />
        </Modal>
    );
}
