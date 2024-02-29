import React, { Fragment } from 'react';

import chatGptAvatar from 'assets/images/1-15-10.jpeg';
import { CompanyTagView } from 'entities/company';
import { BaseTypes } from 'shared/types';
import { Title, Avatar } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../../../../app';
import { UserInfoView } from '../../../../../user';

type Props = {} & BaseTypes.Statuses;

function ChatGptProfileModalView(props: Props) {
    // const { } = props;

    const infoItems = [
        { id: 0, title: 'Никнейм', subtitle: '@Confee ChatGPT' },
        { id: 1, title: 'О себе', subtitle: 'Отвечу на все ваши вопросы, сочиню текст и поделюсь идеями! Чтобы я лучше понял ваш вопрос, пишите подробнее.' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar networkStatus="online" size={200} img={`${appService.getUrls().clientBaseURL}${chatGptAvatar}`} />
                <div className={styles.name}>
                    <Title textAlign="center" variant="H1">
                        Confee ChatGPT
                    </Title>
                </div>
                <Title primary={false} textAlign="center" variant="H3R">
                    в сети
                </Title>
            </div>
            <div className={styles.secondaryInfo}>
                {infoItems.map((i) => (
                    <Fragment key={i.id}>
                        <div className={styles.row}>
                            <Title primary={false} textAlign="left" variant="H4R">
                                {i.title}
                            </Title>
                            <Title textAlign="left" textWrap variant="H4M">
                                {i.subtitle}
                            </Title>
                        </div>
                        {i.id !== 1 && <div className={styles.border} />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ChatGptProfileModalView;
