import React from 'react';

import styles from './styles.module.scss';

type Props = {
    error: 'width' | 'height';
    size: { width: number; height: number };
};

function SizeWarningPage(props: Props) {
    const { size, error } = props;

    return (
        <div className={styles.page}>
            <p>{error === 'width' && `Ширина: ${size.width} пока что не поддерживается. Минимально 1015.`}</p>
            <p>{error === 'height' && `Высота: ${size.height} пока что не поддерживается. Минимально 1035.`}</p>
        </div>
    );
}

export default SizeWarningPage;
