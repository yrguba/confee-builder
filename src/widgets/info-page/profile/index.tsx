import React from 'react';

import { VideoCallBtn, AudioCallBtn, MessagesBtn } from 'features/button';
import { ChatContentNav } from 'features/chat';
import { UserDossier } from 'features/user';

import styles from './styles.module.scss';

function ProfileInfoPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.dossier}>
                    <UserDossier />
                </div>
                <div className={styles.buttons}>
                    <AudioCallBtn />
                    <VideoCallBtn />
                    <MessagesBtn />
                </div>
            </div>
            <div className={styles.nav}>
                <ChatContentNav />
            </div>
        </div>
    );
}

export default ProfileInfoPage;
