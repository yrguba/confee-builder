import Linkify from 'linkify-react';
import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import 'linkify-plugin-mention';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text } = props;

    const options = {
        render: {
            mention: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                return (
                    <span
                        // onClick={() => {
                        //     const found = chatUsers?.find((user) => user.nickname === href.substring(1));
                        //     found && setUser(found);
                        // }}
                        className={styles.tag}
                        {...props}
                    >
                        {content}
                    </span>
                );
            },
        },
    };

    const checkLongWord = (str: string) => {
        return str?.split(' ')?.map((word, index) =>
            word.length > 30 ? (
                <span key={index} className={styles.longWord}>
                    {word}
                </span>
            ) : (
                `${word} `
            )
        );
    };

    return (
        <Box className={styles.wrapper}>
            <Linkify options={options}>{checkLongWord(text)}</Linkify>
        </Box>
    );
}

export default TextMessage;
