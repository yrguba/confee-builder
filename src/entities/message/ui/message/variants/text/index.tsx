import axios from 'axios';
import Linkify from 'linkify-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import LinkInfo from './widgets/link-info';
import 'linkify-plugin-mention';
import { chatTypes } from '../../../../../chat';
import { ChatProxy } from '../../../../../chat/model/types';
import { employeeProxy } from '../../../../../company';
import { EmployeeProxy } from '../../../../../company/model/types';
import { userProxy } from '../../../../../user';
import { User, UserProxy } from '../../../../../user/model/types';
import { MessageProxy } from '../../../../model/types';

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
    const withLink = useEasyState(false);

    useEffect(() => {
        if (text && once.current) {
            Promise.all(
                text.split(' ').map(async (word, index) => {
                    if (regex.url.test(word) && !word.includes('localhost')) {
                        withLink.set(true);
                        const data = await axios.get(`https://dev.chat.softworks.ru/api/v2/http/link-preview`, {
                            params: {
                                link: word,
                                buffer: true,
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
        <Box
            className={styles.wrapper}
            style={{
                flexDirection: withLink.value ? 'column' : 'row',
            }}
        >
            <Linkify options={options}>{text}</Linkify>
            <div className={styles.info}>
                {message.is_edited && (
                    <div className={styles.edited}>
                        <Title variant="Body14">Изменено</Title>
                    </div>
                )}
                <div>
                    <Title primary={false} variant="H4R">
                        {message.date}
                    </Title>
                </div>
                <Box.Animated visible trigger={`${sending}${sendingError}`} className={styles.icon}>
                    {isMy && !sending && !sendingError && <Icons variant={message.users_have_read.length ? 'double-check' : 'check'} />}
                    {sending && <Icons variant="clock" />}
                    {sendingError && <Icons variant="error" />}
                </Box.Animated>
            </div>
        </Box>
    );
}

export default TextMessage;
