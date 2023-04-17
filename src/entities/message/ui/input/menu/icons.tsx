import React from 'react';

import { InputMenuIcons } from '../../../model/types';

type Props = {
    variants: InputMenuIcons;
};

function BaseIcons(props: Props) {
    const { variants } = props;

    switch (variants) {
        case 'image': {
            return (
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M25.3332 13.3327C24.9795 13.3327 24.6404 13.4732 24.3904 13.7232C24.1403 13.9733 23.9998 14.3124 23.9998 14.666V19.1727L22.0265 17.1993C21.3297 16.5081 20.388 16.1202 19.4065 16.1202C18.425 16.1202 17.4833 16.5081 16.7865 17.1993L15.8532 18.146L12.5465 14.826C11.8497 14.1347 10.908 13.7468 9.9265 13.7468C8.945 13.7468 8.00327 14.1347 7.3065 14.826L5.33317 16.8127V9.33268C5.33317 8.97906 5.47365 8.63992 5.7237 8.38987C5.97374 8.13982 6.31288 7.99935 6.6665 7.99935H17.3332C17.6868 7.99935 18.0259 7.85887 18.276 7.60882C18.526 7.35878 18.6665 7.01964 18.6665 6.66602C18.6665 6.31239 18.526 5.97326 18.276 5.72321C18.0259 5.47316 17.6868 5.33268 17.3332 5.33268H6.6665C5.60564 5.33268 4.58822 5.75411 3.83808 6.50426C3.08793 7.2544 2.6665 8.27182 2.6665 9.33268V25.626C2.67002 26.608 3.06167 27.5488 3.75604 28.2431C4.45042 28.9375 5.39118 29.3292 6.37317 29.3327H22.9598C23.3211 29.3298 23.6802 29.2759 24.0265 29.1727C24.7964 28.9567 25.4742 28.4941 25.9559 27.8559C26.4376 27.2176 26.6966 26.439 26.6932 25.6393V14.666C26.6932 14.4887 26.6579 14.3131 26.5892 14.1495C26.5205 13.986 26.4199 13.8378 26.2933 13.7137C26.1666 13.5895 26.0165 13.4918 25.8516 13.4264C25.6867 13.361 25.5105 13.3291 25.3332 13.3327ZM6.6665 26.666C6.31288 26.666 5.97374 26.5255 5.7237 26.2755C5.47365 26.0254 5.33317 25.6863 5.33317 25.3327V20.5727L9.1865 16.7193C9.38137 16.5256 9.64502 16.4168 9.91984 16.4168C10.1947 16.4168 10.4583 16.5256 10.6532 16.7193L20.6132 26.666H6.6665ZM23.9998 25.3327C23.9913 25.5909 23.9079 25.841 23.7598 26.0527L17.7332 19.9993L18.6798 19.066C18.7754 18.9685 18.8895 18.8909 19.0154 18.838C19.1414 18.7851 19.2766 18.7579 19.4132 18.7579C19.5498 18.7579 19.685 18.7851 19.8109 18.838C19.9368 18.8909 20.0509 18.9685 20.1465 19.066L23.9998 22.946V25.3327ZM27.9998 5.33268H26.6665V3.99935C26.6665 3.64573 26.526 3.30659 26.276 3.05654C26.0259 2.80649 25.6868 2.66602 25.3332 2.66602C24.9795 2.66602 24.6404 2.80649 24.3904 3.05654C24.1403 3.30659 23.9998 3.64573 23.9998 3.99935V5.33268H22.6665C22.3129 5.33268 21.9737 5.47316 21.7237 5.72321C21.4736 5.97326 21.3332 6.31239 21.3332 6.66602C21.3332 7.01964 21.4736 7.35878 21.7237 7.60882C21.9737 7.85887 22.3129 7.99935 22.6665 7.99935H23.9998V9.33268C23.9998 9.6863 24.1403 10.0254 24.3904 10.2755C24.6404 10.5255 24.9795 10.666 25.3332 10.666C25.6868 10.666 26.0259 10.5255 26.276 10.2755C26.526 10.0254 26.6665 9.6863 26.6665 9.33268V7.99935H27.9998C28.3535 7.99935 28.6926 7.85887 28.9426 7.60882C29.1927 7.35878 29.3332 7.01964 29.3332 6.66602C29.3332 6.31239 29.1927 5.97326 28.9426 5.72321C28.6926 5.47316 28.3535 5.33268 27.9998 5.33268Z"
                        fill="white"
                    />
                </svg>
            );
        }
        case 'audio': {
            return (
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.6667 23.9993H25.3333V22.666C25.3333 22.3124 25.1929 21.9733 24.9428 21.7232C24.6928 21.4732 24.3536 21.3327 24 21.3327C23.6464 21.3327 23.3072 21.4732 23.0572 21.7232C22.8071 21.9733 22.6667 22.3124 22.6667 22.666V23.9993H21.3333C20.9797 23.9993 20.6406 24.1398 20.3905 24.3899C20.1405 24.6399 20 24.9791 20 25.3327C20 25.6863 20.1405 26.0254 20.3905 26.2755C20.6406 26.5255 20.9797 26.666 21.3333 26.666H22.6667V27.9993C22.6667 28.353 22.8071 28.6921 23.0572 28.9422C23.3072 29.1922 23.6464 29.3327 24 29.3327C24.3536 29.3327 24.6928 29.1922 24.9428 28.9422C25.1929 28.6921 25.3333 28.353 25.3333 27.9993V26.666H26.6667C27.0203 26.666 27.3594 26.5255 27.6095 26.2755C27.8595 26.0254 28 25.6863 28 25.3327C28 24.9791 27.8595 24.6399 27.6095 24.3899C27.3594 24.1398 27.0203 23.9993 26.6667 23.9993ZM17.3333 26.666H8C7.64638 26.666 7.30724 26.5255 7.05719 26.2755C6.80714 26.0254 6.66667 25.6863 6.66667 25.3327V6.66602C6.66667 6.31239 6.80714 5.97326 7.05719 5.72321C7.30724 5.47316 7.64638 5.33268 8 5.33268H14.6667V9.33268C14.6667 10.3935 15.0881 11.411 15.8382 12.1611C16.5884 12.9113 17.6058 13.3327 18.6667 13.3327H22.6667V17.3327C22.6667 17.6863 22.8071 18.0254 23.0572 18.2755C23.3072 18.5255 23.6464 18.666 24 18.666C24.3536 18.666 24.6928 18.5255 24.9428 18.2755C25.1929 18.0254 25.3333 17.6863 25.3333 17.3327V11.9993C25.3333 11.9993 25.3333 11.9993 25.3333 11.9193C25.3194 11.7969 25.2926 11.6762 25.2533 11.5593V11.4393C25.1892 11.3023 25.1037 11.1762 25 11.066L17 3.06602C16.8898 2.9623 16.7638 2.87679 16.6267 2.81268C16.5826 2.80496 16.5374 2.80496 16.4933 2.81268C16.3637 2.74335 16.2244 2.69391 16.08 2.66602H8C6.93913 2.66602 5.92172 3.08744 5.17157 3.83759C4.42143 4.58773 4 5.60515 4 6.66602V25.3327C4 26.3935 4.42143 27.411 5.17157 28.1611C5.92172 28.9113 6.93913 29.3327 8 29.3327H17.3333C17.687 29.3327 18.0261 29.1922 18.2761 28.9422C18.5262 28.6921 18.6667 28.353 18.6667 27.9993C18.6667 27.6457 18.5262 27.3066 18.2761 27.0565C18.0261 26.8065 17.687 26.666 17.3333 26.666ZM17.3333 7.21268L20.7867 10.666H18.6667C18.313 10.666 17.9739 10.5255 17.7239 10.2755C17.4738 10.0254 17.3333 9.6863 17.3333 9.33268V7.21268ZM10.6667 10.666C10.313 10.666 9.97391 10.8065 9.72386 11.0565C9.47381 11.3066 9.33333 11.6457 9.33333 11.9993C9.33333 12.353 9.47381 12.6921 9.72386 12.9422C9.97391 13.1922 10.313 13.3327 10.6667 13.3327H12C12.3536 13.3327 12.6928 13.1922 12.9428 12.9422C13.1929 12.6921 13.3333 12.353 13.3333 11.9993C13.3333 11.6457 13.1929 11.3066 12.9428 11.0565C12.6928 10.8065 12.3536 10.666 12 10.666H10.6667ZM17.3333 21.3327H10.6667C10.313 21.3327 9.97391 21.4732 9.72386 21.7232C9.47381 21.9733 9.33333 22.3124 9.33333 22.666C9.33333 23.0196 9.47381 23.3588 9.72386 23.6088C9.97391 23.8589 10.313 23.9993 10.6667 23.9993H17.3333C17.687 23.9993 18.0261 23.8589 18.2761 23.6088C18.5262 23.3588 18.6667 23.0196 18.6667 22.666C18.6667 22.3124 18.5262 21.9733 18.2761 21.7232C18.0261 21.4732 17.687 21.3327 17.3333 21.3327ZM18.6667 15.9993H10.6667C10.313 15.9993 9.97391 16.1398 9.72386 16.3899C9.47381 16.6399 9.33333 16.9791 9.33333 17.3327C9.33333 17.6863 9.47381 18.0254 9.72386 18.2755C9.97391 18.5255 10.313 18.666 10.6667 18.666H18.6667C19.0203 18.666 19.3594 18.5255 19.6095 18.2755C19.8595 18.0254 20 17.6863 20 17.3327C20 16.9791 19.8595 16.6399 19.6095 16.3899C19.3594 16.1398 19.0203 15.9993 18.6667 15.9993Z"
                        fill="white"
                    />
                </svg>
            );
        }

        case 'video': {
            return (
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.6668 14.0007C26.3132 14.0007 25.9741 14.1411 25.724 14.3912C25.474 14.6412 25.3335 14.9804 25.3335 15.334V24.6673C25.3335 25.0209 25.193 25.3601 24.943 25.6101C24.6929 25.8602 24.3538 26.0007 24.0002 26.0007H5.3335C4.97987 26.0007 4.64074 25.8602 4.39069 25.6101C4.14064 25.3601 4.00016 25.0209 4.00016 24.6673V14.0007C4.00016 13.647 4.14064 13.3079 4.39069 13.0578C4.64074 12.8078 4.97987 12.6673 5.3335 12.6673H8.00016C8.29092 12.6825 8.57865 12.6021 8.81941 12.4384C9.06017 12.2746 9.24072 12.0366 9.3335 11.7607L10.0535 9.57398C10.1429 9.30916 10.3134 9.07914 10.5407 8.91644C10.768 8.75374 11.0406 8.6666 11.3202 8.66732H18.6668C19.0205 8.66732 19.3596 8.52684 19.6096 8.27679C19.8597 8.02674 20.0002 7.68761 20.0002 7.33398C20.0002 6.98036 19.8597 6.64122 19.6096 6.39118C19.3596 6.14113 19.0205 6.00065 18.6668 6.00065H11.2535C10.4156 6.00222 9.59928 6.2669 8.91985 6.75732C8.24043 7.24775 7.73217 7.93917 7.46683 8.73398L7.04016 10.0673H5.3335C4.27263 10.0673 3.25521 10.4887 2.50507 11.2389C1.75492 11.989 1.3335 13.0065 1.3335 14.0673V24.734C1.3335 25.7948 1.75492 26.8123 2.50507 27.5624C3.25521 28.3126 4.27263 28.734 5.3335 28.734H24.0002C25.061 28.734 26.0784 28.3126 26.8286 27.5624C27.5787 26.8123 28.0002 25.7948 28.0002 24.734V15.4007C28.0092 15.22 27.9814 15.0395 27.9185 14.8699C27.8555 14.7004 27.7587 14.5454 27.634 14.4144C27.5093 14.2835 27.3592 14.1793 27.193 14.1081C27.0267 14.037 26.8477 14.0004 26.6668 14.0007V14.0007ZM14.6668 12.6673C13.612 12.6673 12.5809 12.9801 11.7038 13.5661C10.8267 14.1522 10.1431 14.9851 9.73947 15.9597C9.3358 16.9342 9.23019 18.0066 9.43597 19.0411C9.64176 20.0757 10.1497 21.026 10.8956 21.7719C11.6415 22.5178 12.5918 23.0257 13.6263 23.2315C14.6609 23.4373 15.7333 23.3317 16.7078 22.928C17.6823 22.5243 18.5153 21.8408 19.1013 20.9637C19.6874 20.0866 20.0002 19.0555 20.0002 18.0007C20.0002 16.5862 19.4383 15.2296 18.4381 14.2294C17.4379 13.2292 16.0813 12.6673 14.6668 12.6673V12.6673ZM14.6668 20.6673C14.1394 20.6673 13.6238 20.5109 13.1853 20.2179C12.7468 19.9249 12.405 19.5084 12.2032 19.0211C12.0013 18.5339 11.9485 17.9977 12.0514 17.4804C12.1543 16.9631 12.4083 16.488 12.7812 16.115C13.1542 15.7421 13.6293 15.4881 14.1466 15.3852C14.6639 15.2823 15.2 15.3351 15.6873 15.537C16.1746 15.7388 16.5911 16.0806 16.8841 16.5191C17.1771 16.9577 17.3335 17.4732 17.3335 18.0007C17.3335 18.7079 17.0525 19.3862 16.5524 19.8863C16.0524 20.3864 15.3741 20.6673 14.6668 20.6673ZM29.3335 6.00065H28.0002V4.66732C28.0002 4.3137 27.8597 3.97456 27.6096 3.72451C27.3596 3.47446 27.0205 3.33398 26.6668 3.33398C26.3132 3.33398 25.9741 3.47446 25.724 3.72451C25.474 3.97456 25.3335 4.3137 25.3335 4.66732V6.00065H24.0002C23.6465 6.00065 23.3074 6.14113 23.0574 6.39118C22.8073 6.64122 22.6668 6.98036 22.6668 7.33398C22.6668 7.68761 22.8073 8.02674 23.0574 8.27679C23.3074 8.52684 23.6465 8.66732 24.0002 8.66732H25.3335V10.0007C25.3335 10.3543 25.474 10.6934 25.724 10.9435C25.9741 11.1935 26.3132 11.334 26.6668 11.334C27.0205 11.334 27.3596 11.1935 27.6096 10.9435C27.8597 10.6934 28.0002 10.3543 28.0002 10.0007V8.66732H29.3335C29.6871 8.66732 30.0263 8.52684 30.2763 8.27679C30.5264 8.02674 30.6668 7.68761 30.6668 7.33398C30.6668 6.98036 30.5264 6.64122 30.2763 6.39118C30.0263 6.14113 29.6871 6.00065 29.3335 6.00065Z"
                        fill="white"
                    />
                </svg>
            );
        }
        case 'document': {
            return (
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M26.6667 23.9993H25.3333V22.666C25.3333 22.3124 25.1929 21.9733 24.9428 21.7232C24.6928 21.4732 24.3536 21.3327 24 21.3327C23.6464 21.3327 23.3072 21.4732 23.0572 21.7232C22.8071 21.9733 22.6667 22.3124 22.6667 22.666V23.9993H21.3333C20.9797 23.9993 20.6406 24.1398 20.3905 24.3899C20.1405 24.6399 20 24.9791 20 25.3327C20 25.6863 20.1405 26.0254 20.3905 26.2755C20.6406 26.5255 20.9797 26.666 21.3333 26.666H22.6667V27.9993C22.6667 28.353 22.8071 28.6921 23.0572 28.9422C23.3072 29.1922 23.6464 29.3327 24 29.3327C24.3536 29.3327 24.6928 29.1922 24.9428 28.9422C25.1929 28.6921 25.3333 28.353 25.3333 27.9993V26.666H26.6667C27.0203 26.666 27.3594 26.5255 27.6095 26.2755C27.8595 26.0254 28 25.6863 28 25.3327C28 24.9791 27.8595 24.6399 27.6095 24.3899C27.3594 24.1398 27.0203 23.9993 26.6667 23.9993ZM17.3333 26.666H8C7.64638 26.666 7.30724 26.5255 7.05719 26.2755C6.80714 26.0254 6.66667 25.6863 6.66667 25.3327V6.66602C6.66667 6.31239 6.80714 5.97326 7.05719 5.72321C7.30724 5.47316 7.64638 5.33268 8 5.33268H14.6667V9.33268C14.6667 10.3935 15.0881 11.411 15.8382 12.1611C16.5884 12.9113 17.6058 13.3327 18.6667 13.3327H22.6667V17.3327C22.6667 17.6863 22.8071 18.0254 23.0572 18.2755C23.3072 18.5255 23.6464 18.666 24 18.666C24.3536 18.666 24.6928 18.5255 24.9428 18.2755C25.1929 18.0254 25.3333 17.6863 25.3333 17.3327V11.9993C25.3333 11.9993 25.3333 11.9993 25.3333 11.9193C25.3194 11.7969 25.2926 11.6762 25.2533 11.5593V11.4393C25.1892 11.3023 25.1037 11.1762 25 11.066L17 3.06602C16.8898 2.9623 16.7638 2.87679 16.6267 2.81268C16.5826 2.80496 16.5374 2.80496 16.4933 2.81268C16.3637 2.74335 16.2244 2.69391 16.08 2.66602H8C6.93913 2.66602 5.92172 3.08744 5.17157 3.83759C4.42143 4.58773 4 5.60515 4 6.66602V25.3327C4 26.3935 4.42143 27.411 5.17157 28.1611C5.92172 28.9113 6.93913 29.3327 8 29.3327H17.3333C17.687 29.3327 18.0261 29.1922 18.2761 28.9422C18.5262 28.6921 18.6667 28.353 18.6667 27.9993C18.6667 27.6457 18.5262 27.3066 18.2761 27.0565C18.0261 26.8065 17.687 26.666 17.3333 26.666ZM17.3333 7.21268L20.7867 10.666H18.6667C18.313 10.666 17.9739 10.5255 17.7239 10.2755C17.4738 10.0254 17.3333 9.6863 17.3333 9.33268V7.21268ZM10.6667 10.666C10.313 10.666 9.97391 10.8065 9.72386 11.0565C9.47381 11.3066 9.33333 11.6457 9.33333 11.9993C9.33333 12.353 9.47381 12.6921 9.72386 12.9422C9.97391 13.1922 10.313 13.3327 10.6667 13.3327H12C12.3536 13.3327 12.6928 13.1922 12.9428 12.9422C13.1929 12.6921 13.3333 12.353 13.3333 11.9993C13.3333 11.6457 13.1929 11.3066 12.9428 11.0565C12.6928 10.8065 12.3536 10.666 12 10.666H10.6667ZM17.3333 21.3327H10.6667C10.313 21.3327 9.97391 21.4732 9.72386 21.7232C9.47381 21.9733 9.33333 22.3124 9.33333 22.666C9.33333 23.0196 9.47381 23.3588 9.72386 23.6088C9.97391 23.8589 10.313 23.9993 10.6667 23.9993H17.3333C17.687 23.9993 18.0261 23.8589 18.2761 23.6088C18.5262 23.3588 18.6667 23.0196 18.6667 22.666C18.6667 22.3124 18.5262 21.9733 18.2761 21.7232C18.0261 21.4732 17.687 21.3327 17.3333 21.3327ZM18.6667 15.9993H10.6667C10.313 15.9993 9.97391 16.1398 9.72386 16.3899C9.47381 16.6399 9.33333 16.9791 9.33333 17.3327C9.33333 17.6863 9.47381 18.0254 9.72386 18.2755C9.97391 18.5255 10.313 18.666 10.6667 18.666H18.6667C19.0203 18.666 19.3594 18.5255 19.6095 18.2755C19.8595 18.0254 20 17.6863 20 17.3327C20 16.9791 19.8595 16.6399 19.6095 16.3899C19.3594 16.1398 19.0203 15.9993 18.6667 15.9993Z"
                        fill="white"
                    />
                </svg>
            );
        }

        default:
            return null;
    }
}

export default BaseIcons;
