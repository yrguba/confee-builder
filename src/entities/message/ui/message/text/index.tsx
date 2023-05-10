import Linkify from 'linkify-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    wrapper?: boolean;
    reactionClick?: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message, wrapper = true, reactionClick } = props;

    const renderLink = ({ attributes, content }: any) => {
        const { href, ...props } = attributes;
        console.log(attributes, content);
        return (
            <Link to={href} {...props}>
                {content}
            </Link>
        );
    };

    const options = {
        render: {
            hashtag: renderLink,
            mention: renderLink,
        },
    };

    function Message() {
        return (
            <div className={styles.wrapper}>
                <Linkify options={options}>{message.text}</Linkify>
            </div>
        );
    }

    return !wrapper ? (
        <Message />
    ) : (
        <Wrapper message={message} reactionClick={reactionClick || (() => {})}>
            <Message />
        </Wrapper>
    );
}

export default TextMessageView;
