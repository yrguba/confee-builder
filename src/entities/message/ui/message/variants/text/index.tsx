import axios from 'axios';
import Linkify from 'linkify-react';
import React, { useEffect, useRef } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box, Emoji, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import LinkInfo from './widgets/link-info';
import 'linkify-plugin-mention';
import { chatTypes } from '../../../../../chat';
import { employeeProxy } from '../../../../../company';
import { EmployeeProxy } from '../../../../../company/model/types';
import { userProxy } from '../../../../../user';
import { UserProxy } from '../../../../../user/model/types';
import { MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    openChatProfileModal: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
    message: MessageProxy;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { message, openChatProfileModal, chat } = props;
    const once = useRef(true);
    const linksInfo = useArray({});
    const { text, isMy, sending, sendingError } = message;

    useEffect(() => {
        if (text && once.current) {
            Promise.all(
                text.split(' ').map(async (word, index) => {
                    if (regex.url.test(word) && !word.includes('localhost')) {
                        const data = await axios.get(`https://dev.chat.softworks.ru/api/v2/http/link-preview`, {
                            params: {
                                link: word,
                            },
                        });
                        if (data) return { fullUrl: word, ...data.data, id: index };
                    }
                })
            )
                .then((res) => {
                    const arr: any = res.filter((i) => i !== undefined) || [];
                    linksInfo.replace(arr);
                })
                .catch((e) => {});
        }
        once.current = false;
    }, []);

    const options = {
        render: {
            url: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                const preview: any = linksInfo.array.find((i) => i?.fullUrl === href);
                return (
                    <LinkInfo preview={preview} content={content}>
                        {content}
                    </LinkInfo>
                );
            },
            mention: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                const user = chat?.members.find((i: any) => content === `@${i.nickname}`);
                const employee = chat?.employee_members.find((i: any) => content === `@${i.nickname}`);

                return (
                    <span
                        onClick={() =>
                            user || employee ? openChatProfileModal({ user: userProxy(user) || undefined, employee: employeeProxy(employee) || undefined }) : ''
                        }
                        className={user || employee ? styles.tag : ''}
                        {...props}
                    >
                        {`${content}\xa0`}
                    </span>
                );
            },
        },
    };

    return (
        <Box className={styles.wrapper}>
            {text.split(/(https?:\/\/[^\s]+)/g).map((i, index) => {
                if (regex.url.test(i)) {
                    return (
                        <Linkify key={index} options={options}>
                            {i}
                        </Linkify>
                    );
                }
                return text.length === 2 && regex.emoji.test(text) ? (
                    <Emoji.Item key={index} emoji={i} size={60} />
                ) : (
                    <div className={styles.text}>
                        {message.text?.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)?.map((i, index) => {
                            if (/\p{Emoji_Presentation}/gu.test(i)) {
                                return (
                                    <span key={index} className={styles.emojiWrapper}>
                                        {i}
                                        <span className={styles.emoji}>
                                            <Emoji.Item key={index} emoji={i} size={18} />
                                        </span>
                                    </span>
                                );
                            }
                            return <span key={index}>{i}</span>;
                        })}
                        <span className={styles.info}>
                            <Info
                                date={message.date}
                                is_edited={message.is_edited}
                                sendingError={message.sendingError}
                                sending={message.sending}
                                isMy={message.isMy}
                                checked={!!message.users_have_read?.length}
                            />
                        </span>
                    </div>
                );
            })}
        </Box>
    );
}

export default TextMessage;
