import React from 'react';

import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, InputTypes, Box } from 'shared/ui';

import Registration from './registration';
import SendCode from './send-code';
import styles from './styles.module.scss';

type Props = {
    inputs: {
        email: InputTypes.UseReturnedType;
        code: InputTypes.UseReturnedType;
    };
    sendCode: () => void;

    steps: UseEasyStateReturnType<'sendCode' | 'registration'>;
} & BaseTypes.Statuses;

function AuthAdView(props: Props) {
    const { sendCode, inputs, steps } = props;

    return (
        <Box.Replace
            className={styles.wrapper}
            items={[
                {
                    item: <SendCode sendCode={sendCode} emailInput={inputs.email} />,
                    visible: steps.value === 'sendCode',
                },
                {
                    item: <Registration sendCode={sendCode} steps={steps} inputs={inputs} />,
                    visible: steps.value === 'registration',
                },
            ]}
        />
    );
}

export default AuthAdView;
