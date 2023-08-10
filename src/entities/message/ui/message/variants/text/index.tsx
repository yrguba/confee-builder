import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';
import Linkify from 'linkify-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useArray, useEasyState, useRouter } from 'shared/hooks';
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
    const { navigate } = useRouter();
    const checkLongWord = useCallback((str: string) => {
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
    }, []);

    useEffect(() => {
        if (text && once.current) {
            const infoArr = Promise.all(
                text
                    ?.replace(/\n/g, ' ')
                    .split(' ')
                    .map(async (word, index) => {
                        if (regex.url.test(word) && !word.includes('localhost')) {
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
                    <div {...props} className={styles.linkBlock}>
                        <div
                            className={styles.link}
                            onClick={() => {
                                window.open(content, '_blank');
                            }}
                        >
                            {checkLongWord(content)}
                        </div>
                        <div className={styles.info}>
                            <div className={styles.description}>
                                <Title variant="H3M">{preview?.siteName || 'Неопределенно'}</Title>
                                <Title variant="H4S">{preview?.title || 'Неопределенно'}</Title>
                                <Title variant="Body14">{preview?.description || 'Небезопасный ресурс !'}</Title>
                            </div>
                            <div className={styles.img}>
                                <Image width="70px" height="70px" img={preview?.images[0]} />
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
