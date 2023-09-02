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
    clickTag: (tag: string) => void;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text, clickTag } = props;
    const once = useRef(true);
    const linksInfo = useArray({});

    const checkLongWord = useCallback((str: string, checkLink = true) => {
        return str?.split('\n')?.map((row, index) => {
            return (
                <div key={index} className={styles.row}>
                    {row.split(' ')?.map((word, index) => {
                        if (regex.url.test(word)) {
                            return (
                                <div key={index} className={styles.url}>
                                    {word}
                                </div>
                            );
                        }
                        if (word.length > 7) {
                            return (
                                <span key={index} className={styles.longWord}>
                                    {`${word}\xa0`}
                                </span>
                            );
                        }
                        return <span key={index}>{`${word}\xa0`}</span>;
                    })}
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
                    <span onClick={() => clickTag(content)} className={styles.tag} {...props}>
                        {`${content}\xa0`}
                    </span>
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
