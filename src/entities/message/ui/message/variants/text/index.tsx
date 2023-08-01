import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    text: string;
} & BaseTypes.Statuses;

function TextMessage(props: Props) {
    const { text } = props;

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

    return <Box className={styles.wrapper}>{checkLongWord(text)}</Box>;
}

export default TextMessage;
