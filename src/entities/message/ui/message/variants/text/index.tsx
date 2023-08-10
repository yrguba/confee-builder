import { getLinkPreview } from 'link-preview-js';
import Linkify from 'linkify-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { useArray, useRouter } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import LinkInfo from './widgets/link-info';

import 'linkify-plugin-mention';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text } = props;
    const once = useRef(true);
    const linksInfo = useArray([]);

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
            Promise.all(
                text
                    ?.replace(/\n/g, ' ')
                    .split(' ')
                    .map(async (word, index) => {
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
                        {checkLongWord(content)}
                    </LinkInfo>
                );
            },
            mention: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                return (
                    <span onClick={() => console.log('click tag', content)} className={styles.tag} {...props}>
                        {content}
                    </span>
                );
            },
        },
    };

    return (
        <Box className={styles.wrapper}>
            <Linkify options={options}>{checkLongWord(text)}</Linkify>
        </Box>
    );
}

export default TextMessage;
