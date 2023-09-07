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

type Props = {
    text: string;
    clickTag: (tag: string) => void;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text, clickTag } = props;
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
        format: (value: any, type: any) => {
            console.log(value, type);
            return 'value';
        },
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
                return (
                    <span onClick={() => clickTag(content)} className={styles.tag} {...props}>
                        {`${content}\xa0`}
                    </span>
                );
            },
        },
    };

    const updText = () => {};

    return (
        <Box className={styles.wrapper}>
            <Linkify options={options}>{text}</Linkify>
        </Box>
    );
}

export default TextMessage;
