import React from 'react';

import { ChatCardIcons } from '../../model/types';

type Props = {
    variants: ChatCardIcons;
};

function BaseIcons(props: Props) {
    const { variants } = props;

    switch (variants) {
        case 'check': {
            return (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.47334 0.806696C9.41136 0.74421 9.33763 0.694614 9.25639 0.660768C9.17515 0.626922 9.08802 0.609497 9.00001 0.609497C8.912 0.609497 8.82486 0.626922 8.74362 0.660768C8.66238 0.694614 8.58865 0.74421 8.52667 0.806696L3.56001 5.78003L1.47334 3.6867C1.40899 3.62454 1.33303 3.57566 1.2498 3.54286C1.16656 3.51006 1.07768 3.49397 0.988222 3.49552C0.898768 3.49706 0.810495 3.51622 0.728443 3.55188C0.646391 3.58754 0.572166 3.63902 0.510007 3.70336C0.447848 3.76771 0.398972 3.84367 0.36617 3.92691C0.333367 4.01014 0.31728 4.09903 0.318828 4.18848C0.320375 4.27793 0.339527 4.36621 0.375189 4.44826C0.410852 4.53031 0.462326 4.60454 0.526674 4.6667L3.08667 7.2267C3.14865 7.28918 3.22238 7.33878 3.30362 7.37262C3.38486 7.40647 3.472 7.42389 3.56001 7.42389C3.64802 7.42389 3.73515 7.40647 3.81639 7.37262C3.89763 7.33878 3.97137 7.28918 4.03334 7.2267L9.47334 1.7867C9.54101 1.72427 9.59502 1.6485 9.63195 1.56417C9.66889 1.47983 9.68796 1.38876 9.68796 1.2967C9.68796 1.20463 9.66889 1.11356 9.63195 1.02923C9.59502 0.944892 9.54101 0.869124 9.47334 0.806696Z"
                        fill="#076ED1"
                    />
                </svg>
            );
        }

        default:
            return null;
    }
}

export default BaseIcons;