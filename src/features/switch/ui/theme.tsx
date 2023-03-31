import React from 'react';

import { useTheme } from 'shared/hooks';
import { Switch } from 'shared/ui';

function SwitchThemes() {
    const [theme, setTheme] = useTheme();

    const onChange = (checked: boolean) => {
        setTheme(checked ? 'light' : 'dark_0');
    };

    const darkIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
                <path
                    d="M8.25 15C6.32718 15 4.48311 14.2361 3.12348 12.8765C1.76384 11.5168 1 9.67278 1 7.74996C1 4.81246 2.6875 2.17871 5.30031 1.04152C5.3924 1.00139 5.49444 0.989919 5.59313 1.00861C5.69183 1.02731 5.7826 1.0753 5.85363 1.14632C5.92466 1.21735 5.97265 1.30813 5.99134 1.40683C6.01004 1.50552 5.99857 1.60756 5.95844 1.69964C5.65844 2.38839 5.5 3.27058 5.5 4.24996C5.5 7.69621 8.30375 10.5 11.75 10.5C12.7294 10.5 13.6116 10.3415 14.3003 10.0415C14.3924 10.0014 14.4944 9.98992 14.5931 10.0086C14.6918 10.0273 14.7826 10.0753 14.8536 10.1463C14.9247 10.2174 14.9726 10.3081 14.9913 10.4068C15.01 10.5055 14.9986 10.6076 14.9584 10.6996C13.8213 13.3125 11.1875 15 8.25 15Z"
                    fill="#150E41"
                />
            </g>
        </svg>
    );

    const lightIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.33325 8.00004C3.33325 7.82323 3.26301 7.65366 3.13799 7.52864C3.01297 7.40361 2.8434 7.33337 2.66659 7.33337H1.99992C1.82311 7.33337 1.65354 7.40361 1.52851 7.52864C1.40349 7.65366 1.33325 7.82323 1.33325 8.00004C1.33325 8.17685 1.40349 8.34642 1.52851 8.47144C1.65354 8.59647 1.82311 8.66671 1.99992 8.66671H2.66659C2.8434 8.66671 3.01297 8.59647 3.13799 8.47144C3.26301 8.34642 3.33325 8.17685 3.33325 8.00004ZM3.75992 11.3334L3.28659 11.8067C3.16242 11.9316 3.09272 12.1006 3.09272 12.2767C3.09272 12.4528 3.16242 12.6218 3.28659 12.7467C3.41149 12.8709 3.58046 12.9406 3.75659 12.9406C3.93271 12.9406 4.10168 12.8709 4.22659 12.7467L4.69992 12.2734C4.80914 12.1458 4.86621 11.9818 4.85973 11.814C4.85325 11.6462 4.78369 11.4871 4.66496 11.3683C4.54623 11.2496 4.38707 11.18 4.21929 11.1736C4.0515 11.1671 3.88745 11.2242 3.75992 11.3334ZM7.99992 3.33337C8.17673 3.33337 8.3463 3.26314 8.47132 3.13811C8.59635 3.01309 8.66658 2.84352 8.66658 2.66671V2.00004C8.66658 1.82323 8.59635 1.65366 8.47132 1.52864C8.3463 1.40361 8.17673 1.33337 7.99992 1.33337C7.82311 1.33337 7.65354 1.40361 7.52851 1.52864C7.40349 1.65366 7.33325 1.82323 7.33325 2.00004V2.66671C7.33325 2.84352 7.40349 3.01309 7.52851 3.13811C7.65354 3.26314 7.82311 3.33337 7.99992 3.33337ZM11.7733 4.89337C11.9481 4.89264 12.1157 4.8232 12.2399 4.70004L12.7133 4.22671C12.783 4.16694 12.8397 4.0934 12.8797 4.01069C12.9198 3.92798 12.9422 3.83789 12.9458 3.74608C12.9493 3.65426 12.9339 3.56271 12.9003 3.47716C12.8668 3.39161 12.816 3.31391 12.751 3.24894C12.686 3.18397 12.6083 3.13313 12.5228 3.09962C12.4373 3.0661 12.3457 3.05063 12.2539 3.05417C12.1621 3.05772 12.072 3.08021 11.9893 3.12022C11.9066 3.16024 11.833 3.21692 11.7733 3.28671L11.3333 3.76004C11.2091 3.88495 11.1394 4.05392 11.1394 4.23004C11.1394 4.40616 11.2091 4.57513 11.3333 4.70004C11.4508 4.81695 11.6076 4.88588 11.7733 4.89337ZM3.77325 4.70004C3.89743 4.8232 4.06503 4.89264 4.23992 4.89337C4.32766 4.89388 4.41463 4.87706 4.49586 4.84389C4.57708 4.81071 4.65096 4.76183 4.71325 4.70004C4.83742 4.57513 4.90711 4.40616 4.90711 4.23004C4.90711 4.05392 4.83742 3.88495 4.71325 3.76004L4.23992 3.28671C4.1782 3.22411 4.10475 3.17428 4.02377 3.14007C3.9428 3.10586 3.85587 3.08793 3.76797 3.08731C3.68006 3.08669 3.59289 3.1034 3.51144 3.13646C3.42999 3.16953 3.35585 3.21832 3.29325 3.28004C3.23066 3.34176 3.18083 3.41521 3.14662 3.49619C3.1124 3.57716 3.09448 3.66409 3.09386 3.75199C3.09261 3.92953 3.16193 4.10029 3.28659 4.22671L3.77325 4.70004ZM13.9999 7.33337H13.3333C13.1564 7.33337 12.9869 7.40361 12.8618 7.52864C12.7368 7.65366 12.6666 7.82323 12.6666 8.00004C12.6666 8.17685 12.7368 8.34642 12.8618 8.47144C12.9869 8.59647 13.1564 8.66671 13.3333 8.66671H13.9999C14.1767 8.66671 14.3463 8.59647 14.4713 8.47144C14.5963 8.34642 14.6666 8.17685 14.6666 8.00004C14.6666 7.82323 14.5963 7.65366 14.4713 7.52864C14.3463 7.40361 14.1767 7.33337 13.9999 7.33337ZM12.2399 11.3334C12.1133 11.2629 11.9671 11.2357 11.8236 11.2557C11.68 11.2758 11.5469 11.3421 11.4445 11.4446C11.342 11.5471 11.2757 11.6801 11.2556 11.8237C11.2355 11.9672 11.2628 12.1134 11.3333 12.24L11.8066 12.7134C11.9315 12.8375 12.1005 12.9072 12.2766 12.9072C12.4527 12.9072 12.6217 12.8375 12.7466 12.7134C12.8708 12.5885 12.9404 12.4195 12.9404 12.2434C12.9404 12.0672 12.8708 11.8983 12.7466 11.7734L12.2399 11.3334ZM7.99992 4.33337C7.27472 4.33337 6.56581 4.54842 5.96283 4.95132C5.35985 5.35422 4.88988 5.92687 4.61236 6.59687C4.33484 7.26686 4.26223 8.00411 4.40371 8.71537C4.54518 9.42663 4.8944 10.08 5.40719 10.5928C5.91999 11.1056 6.57332 11.4548 7.28459 11.5963C7.99585 11.7377 8.7331 11.6651 9.40309 11.3876C10.0731 11.1101 10.6457 10.6401 11.0486 10.0371C11.4515 9.43415 11.6666 8.72524 11.6666 8.00004C11.6648 7.02812 11.2779 6.09651 10.5907 5.40926C9.90344 4.72201 8.97184 4.33514 7.99992 4.33337ZM7.99992 10.3334C7.53843 10.3334 7.0873 10.1965 6.70359 9.94014C6.31987 9.68375 6.0208 9.31933 5.8442 8.89297C5.66759 8.46661 5.62139 7.99745 5.71142 7.54483C5.80145 7.09221 6.02368 6.67645 6.35 6.35012C6.67633 6.0238 7.09208 5.80157 7.54471 5.71154C7.99733 5.62151 8.46649 5.66772 8.89285 5.84432C9.31921 6.02093 9.68362 6.31999 9.94001 6.70371C10.1964 7.08742 10.3333 7.53855 10.3333 8.00004C10.3333 8.61888 10.0874 9.21237 9.64983 9.64996C9.21225 10.0875 8.61876 10.3334 7.99992 10.3334ZM7.99992 12.6667C7.82311 12.6667 7.65354 12.7369 7.52851 12.862C7.40349 12.987 7.33325 13.1566 7.33325 13.3334V14C7.33325 14.1769 7.40349 14.3464 7.52851 14.4714C7.65354 14.5965 7.82311 14.6667 7.99992 14.6667C8.17673 14.6667 8.3463 14.5965 8.47132 14.4714C8.59635 14.3464 8.66658 14.1769 8.66658 14V13.3334C8.66658 13.1566 8.59635 12.987 8.47132 12.862C8.3463 12.7369 8.17673 12.6667 7.99992 12.6667Z"
                fill="#7B57C8"
            />
        </svg>
    );

    return (
        <Switch
            uncheckedIcon={false}
            checkedIcon={false}
            uncheckedHandleIcon={darkIcon}
            checkedHandleIcon={lightIcon}
            checked={theme === 'light'}
            onChange={onChange}
            onColor="#7C98DE"
            offHandleColor="#7B57C8"
            width={46}
            height={28}
            handleDiameter={24}
        />
    );
}

export default SwitchThemes;
