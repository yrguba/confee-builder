import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Input } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {} & BaseTypes.Statuses;

function ChatGptView(props: Props) {
    // const {  } = props;

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                // messageTextState.set((prev) => `${prev}\n`);
            } else {
                // sendMessage();
            }
        }
    };

    return (
        <Box className={styles.wrapper}>
            <div />
            <div />
            <div>
                {/* <Input.Textarea */}
                {/*    focusTrigger={['s']} */}
                {/*    placeholder="Написать сообщение..." */}
                {/*    focus */}
                {/*    value="" */}
                {/*    onChange={(e) => console.log(e.target.value)} */}
                {/*    onKeyDown={onKeyDown} */}
                {/* /> */}
            </div>
        </Box>
    );
}

export default ChatGptView;
