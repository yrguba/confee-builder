import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, InputTypes, Box } from 'shared/ui';

import Registration from './registration';
import SendCode from './send-code';
import styles from './styles.module.scss';
import { UseEasyStateReturnType } from '../../../../shared/hooks';

type Props = {
    sendCode: () => void;
    emailInput: InputTypes.UseReturnedType;
    steps: UseEasyStateReturnType<'sendCode' | 'registration'>;
} & BaseTypes.Statuses;

function AuthAdView(props: Props) {
    const { sendCode, emailInput, steps } = props;

    return (
        <Box.Replace
            className={styles.wrapper}
            items={[
                {
                    item: <SendCode {...props} />,
                    visible: steps.value === 'sendCode',
                },
                {
                    item: <Registration {...props} />,
                    visible: steps.value === 'registration',
                },
            ]}
        />
    );
}

export default AuthAdView;
