import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../../shared/hooks';
import { Input } from '../../../../../../shared/ui';

type Props = {
    description?: string;
    setDescription: (value: string) => void;
} & BaseTypes.Statuses;

function ChatDescriptionView(props: Props) {
    const { description, setDescription, disabled } = props;

    const updDescription = useEasyState(description || '');

    return (
        <div className={styles.wrapper} style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            <Input.Textarea
                clickAway={() => {
                    if (updDescription.value || description) {
                        setDescription(updDescription.value);
                    }
                }}
                maxRows={5}
                maxLength={500}
                placeholder="Описание"
                lineBreak="enterAndCtrl"
                focusTrigger={[]}
                value={updDescription.value}
                textChange={updDescription.set}
            />
        </div>
    );
}

export default ChatDescriptionView;
