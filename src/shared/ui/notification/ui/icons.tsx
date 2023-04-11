import React from 'react';

import { Icons as SharedIcon } from 'shared/ui';

type Props = {
    variants: 'exit';
};

function Icons(props: Props) {
    const { variants } = props;

    switch (variants) {
        case 'exit': {
            return <SharedIcon variants="exit" size={12} />;
        }

        default:
            return null;
    }
}

export default Icons;
