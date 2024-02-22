import React from 'react';

import chatGptAvatar from 'assets/images/1-15-10.jpeg';
import { CompanyTagView } from 'entities/company';
import { BaseTypes } from 'shared/types';
import { Title, Avatar } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../../../../app';

type Props = {} & BaseTypes.Statuses;

function ChatGptProfileModalView(props: Props) {
    // const { } = props;
    console.log(chatGptAvatar);
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar size={200} img={`${appService.getUrls().clientBaseURL}${chatGptAvatar}`} />
                <div className={styles.name}>
                    <Title textAlign="center" variant="H1">
                        ChatGtp
                    </Title>
                </div>
                <Title textAlign="center" variant="H3R">
                    Bot
                </Title>
            </div>
        </div>
    );
}

export default ChatGptProfileModalView;
