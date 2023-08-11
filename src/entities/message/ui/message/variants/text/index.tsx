import { getLinkPreview } from 'link-preview-js';
import Linkify from 'linkify-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useArray } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import LinkInfo from './widgets/link-info';
import YouTubePlayer from './widgets/youTube-player';
import 'linkify-plugin-mention';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text } = props;
    const once = useRef(true);
    const linksInfo = useArray([]);

    const checkLongWord = useCallback((str: string, checkLink = true) => {
        return str.split(' ')?.map((word, index) => {
            if (!regex.url.test(word)) {
                return word.length > 30 ? (
                    <span key={index} className={styles.longWord}>
                        {word}
                    </span>
                ) : (
                    word
                );
            }
            return (
                <div key={index} className={styles.url}>
                    {word}
                </div>
            );
        });
    }, []);

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

                return regex.youTubeUrl.test(href) ? (
                    <YouTubePlayer url={href}>{checkLongWord(content)}</YouTubePlayer>
                ) : (
                    <LinkInfo preview={preview} content={content}>
                        {checkLongWord(content)}
                    </LinkInfo>
                );
            },
            mention: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                return (
                    <div onClick={() => console.log('click tag', content)} className={styles.tag} {...props}>
                        {content}
                    </div>
                );
            },
        },
    };

    return (
        <Box className={styles.wrapper}>
            <Linkify options={options}>{checkLongWord(text, false)}</Linkify>
        </Box>
    );
}

export default TextMessage;
