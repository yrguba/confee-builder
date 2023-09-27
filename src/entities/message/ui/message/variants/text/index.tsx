import { getLinkPreview } from 'link-preview-js';
import Linkify from 'linkify-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useArray } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import LinkInfo from './widgets/link-info';
import 'linkify-plugin-mention';
import { chatTypes } from '../../../../../chat';
import { ChatProxy } from '../../../../../chat/model/types';
import { User } from '../../../../../user/model/types';

type Props = {
    text: string;
    clickTag: (tag: User) => void;
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text, clickTag, chat } = props;
    const once = useRef(true);
    const linksInfo = useArray({});

    useEffect(() => {
        if (text && once.current) {
            Promise.all(
                text.split(' ').map(async (word, index) => {
                    if (!regex.youTubeUrl.test(word) && regex.url.test(word) && !word.includes('localhost')) {
                        const data = await getLinkPreview(word);
                        if (data) return { fullUrl: word, ...data, id: index };
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
                const arr: any = chat?.is_personal ? chat?.members : chat?.employee_members;
                const user = arr.find((i: any) => content === `@${i.nickname}`);
                return (
                    <span onClick={() => (user ? clickTag(user) : '')} className={user ? styles.tag : ''} {...props}>
                        {`${content}\xa0`}
                    </span>
                );
            },
        },
    };

    return (
        <Box className={styles.wrapper}>
            <Linkify options={options}>{text}</Linkify>
        </Box>
    );
}

export default TextMessage;
