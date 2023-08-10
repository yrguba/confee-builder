import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';
import Linkify from 'linkify-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box, Image, Title } from 'shared/ui';

import styles from './styles.module.scss';

import 'linkify-plugin-mention';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text } = props;
    const once = useRef(true);
    const linksInfo = useArray([]);

    const checkLongWord = useCallback(
        (str: string) => {
            return str
                ?.replace(/\n/g, ' ')
                .split(' ')
                ?.map((word, index) =>
                    word.length > 30 ? (
                        regex.url.test(word) ? (
                            <div key={index} className={styles.longUrl}>
                                {word}
                            </div>
                        ) : (
                            <span key={index} className={styles.longWord}>
                                {word}
                            </span>
                        )
                    ) : (
                        `${word} `
                    )
                );
        },
        [text]
    );

    useEffect(() => {
        if (text && once.current) {
            text.split(' ').forEach((word) => {
                if (regex.url.test(word) && !word.includes('localhost')) {
                    console.log(word);
                    // getLinkPreview(word).then((data: any) => {
                    //     linksInfo.push({ fullUrl: word, ...data });
                    // });
                }
            });
        }
        once.current = false;
    }, []);

    const options = {
        render: {
            url: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                const preview: any = linksInfo.array.find((i) => i?.fullUrl === href);
                console.log('preview', preview);
                return (
                    <div {...props} className={styles.linkBlock}>
                        <div className={styles.link}>{checkLongWord(content)}</div>
                        <div className={styles.info}>
                            <div className={styles.description}>
                                <Title variant="H3M">{preview?.siteName || 'wdbnawbnduwahbdubwaidbwahbdhwbadbawjbdjabdjbsjdbjwbdjbajwbdwj'}</Title>
                                <Title variant="H4S">{preview?.title || 'wdbnawbnduwahbdubwaidbwahbdhwbadbawjbdjabdjbsjdbjwbdjbajwbdwj'}</Title>
                                <Title variant="Body14">
                                    {preview?.description ||
                                        'wdbnawbnduwahbdubwaidbwahbdhwbadbawjbdjabdjbsjdbjwbdjbajwbdwjwdbnawbnduwahbdubwaidbwahbdhwbadbawjbdjabdjbsjdbjwbdjbajwbdwj'}
                                </Title>
                            </div>
                            <div className={styles.img}>
                                <Image width="60px" height="60px" img={preview?.images[0] || ''} />
                            </div>
                        </div>
                    </div>
                );
            },
            mention: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                return (
                    <span
                        onClick={() => {
                            console.log('click tag', content);
                        }}
                        className={styles.tag}
                        {...props}
                    >
                        {content}
                    </span>
                );
            },
        },
    };

    return (
        <Box className={styles.wrapper}>
            <Linkify options={options}>{checkLongWord(text)}</Linkify>
            {/* <LinkPreview url="https://gitlab.srv.mf-t.ru/Confee-client/confee/-/blob/main/src/features/message/ui/input.tsx" width="400px" /> */}
        </Box>
    );
}

export default TextMessage;
