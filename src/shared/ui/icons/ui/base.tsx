import React from 'react';

import styles from './styles.module.scss';
import { BaseIconsProps } from '../types';

function BaseIcons(props: BaseIconsProps) {
    const { variant, size = 24 } = props;

    switch (variant) {
        case 'create-group': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="7" r="4" stroke="#7B57C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21"
                        stroke="#7B57C8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16 3.12988C17.7699 3.58305 19.0078 5.17787 19.0078 7.00488C19.0078 8.83189 17.7699 10.4267 16 10.8799"
                        stroke="#7B57C8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21 21.0004V19.0004C20.9896 17.185 19.7578 15.6042 18 15.1504"
                        stroke="#7B57C8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        }
        case 'add-company': {
            return (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#7B57C8" />
                    <path
                        d="M16.8 19.1998H15.2C14.76 19.1998 14.4 18.8398 14.4 18.3998H8.808V21.5998C8.808 22.4798 9.528 23.1998 10.408 23.1998H21.6C22.48 23.1998 23.2 22.4798 23.2 21.5998V18.3998H17.6C17.6 18.8398 17.24 19.1998 16.8 19.1998ZM22.4 11.9998H19.2C19.2 10.2318 17.768 8.7998 16 8.7998C14.232 8.7998 12.8 10.2318 12.8 11.9998H9.6C8.72 11.9998 8 12.7198 8 13.5998V15.9998C8 16.8878 8.712 17.5998 9.6 17.5998H14.4V16.7998C14.4 16.3598 14.76 15.9998 15.2 15.9998H16.8C17.24 15.9998 17.6 16.3598 17.6 16.7998V17.5998H22.4C23.28 17.5998 24 16.8798 24 15.9998V13.5998C24 12.7198 23.28 11.9998 22.4 11.9998ZM14.4 11.9998C14.4 11.1198 15.12 10.3998 16 10.3998C16.88 10.3998 17.6 11.1198 17.6 11.9998H14.392H14.4Z"
                        fill="white"
                    />
                </svg>
            );
        }
        case 'rotate-img': {
            return (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2211_115165" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                        <rect x="24.5" width="24" height="24" transform="rotate(90 24.5 0)" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2211_115165)">
                        <path d="M2.38943 22.0161C1.91348 22.0161 1.50603 21.8466 1.1671 21.5077C0.828159 21.1688 0.658691 20.7613 0.658691 20.2854V7.08387C0.658691 6.60792 0.828159 6.20048 1.1671 5.86154C1.50603 5.5226 1.91348 5.35314 2.38943 5.35314H15.5909C16.0669 5.35314 16.4743 5.5226 16.8132 5.86154C17.1522 6.20048 17.3216 6.60792 17.3216 7.08387V20.2854C17.3216 20.7613 17.1522 21.1688 16.8132 21.5077C16.4743 21.8466 16.0669 22.0161 15.5909 22.0161H2.38943ZM2.38943 20.2854H15.5909V7.08387H2.38943V20.2854Z" />
                        <path d="M21.584 10.7349L24.2645 8.05436C24.5785 7.74033 24.5785 7.23119 24.2645 6.91716C23.9505 6.60314 23.4413 6.60314 23.1273 6.91716L22.3962 7.64822V7.50607C22.3962 5.69197 21.7599 4.15541 20.4874 2.89637C19.2148 1.63733 17.6715 1.00781 15.8574 1.00781H11.7925C11.3425 1.00781 10.9788 1.37259 10.9788 1.82257C10.9788 2.27255 11.3426 2.63713 11.7926 2.63669C13.137 2.63534 15.5849 2.63238 15.8574 2.63238C17.2247 2.63238 18.3856 3.10621 19.34 4.05387C20.2945 5.00153 20.7717 6.15226 20.7717 7.50607V7.64822L20.0406 6.91716C19.7266 6.60314 19.2175 6.60314 18.9034 6.91716C18.5894 7.23119 18.5894 7.74033 18.9034 8.05436L21.584 10.7349Z" />
                    </g>
                </svg>
            );
        }
        case 'crop': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_2243_142624" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2243_142624)">
                        <path d="M18 23C17.4477 23 17 22.5523 17 22V19H7C6.45 19 5.97917 18.8042 5.5875 18.4125C5.19583 18.0208 5 17.55 5 17V7H2C1.44772 7 1 6.55228 1 6C1 5.44772 1.44772 5 2 5H5V2C5 1.44772 5.44772 1 6 1C6.55228 1 7 1.44772 7 2V17H22C22.5523 17 23 17.4477 23 18C23 18.5523 22.5523 19 22 19H19V22C19 22.5523 18.5523 23 18 23ZM18 15C17.4477 15 17 14.5523 17 14V7H10C9.44771 7 9 6.55228 9 6C9 5.44772 9.44771 5 10 5H17C17.55 5 18.0208 5.19583 18.4125 5.5875C18.8042 5.97917 19 6.45 19 7V14C19 14.5523 18.5523 15 18 15Z" />
                    </g>
                </svg>
            );
        }
        case 'upload': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'minimize': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.16679 17H17.8335C18.4751 17 19.0001 17.45 19.0001 18C19.0001 18.55 18.4751 19 17.8335 19H6.16679C5.52512 19 5.00012 18.55 5.00012 18C5.00012 17.45 5.52512 17 6.16679 17Z" />
                </svg>
            );
        }
        case 'not-full-screen': {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 18V9H2V18H14ZM16 13V11H18V2H6V7H4V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V11C20 11.55 19.8042 12.0208 19.4125 12.4125C19.0208 12.8042 18.55 13 18 13H16ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V9C0 8.45 0.195833 7.97917 0.5875 7.5875C0.979167 7.19583 1.45 7 2 7H14C14.55 7 15.0208 7.19583 15.4125 7.5875C15.8042 7.97917 16 8.45 16 9V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2Z" />
                </svg>
            );
        }
        case 'full-screen': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.25 5H6.75C5.7875 5 5 5.7875 5 6.75V17.25C5 18.2125 5.7875 19 6.75 19H17.25C18.2125 19 19 18.2125 19 17.25V6.75C19 5.7875 18.2125 5 17.25 5ZM16.375 17.25H7.625C7.14375 17.25 6.75 16.8562 6.75 16.375V7.625C6.75 7.14375 7.14375 6.75 7.625 6.75H16.375C16.8562 6.75 17.25 7.14375 17.25 7.625V16.375C17.25 16.8562 16.8562 17.25 16.375 17.25Z" />
                </svg>
            );
        }
        case 'create-personal': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z"
                        fill="#7B57C8"
                    />
                </svg>
            );
        }
        case 'check-outlined': {
            return (
                <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.6 14.6L15.65 7.55L14.25 6.15L11.425 8.975L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
                        fill="#7B57C8"
                    />
                    <path d="M8.6 14.6L15.65 7.55L14.25 6.15L11.425 8.975L8.6 11.8L5.75 8.95L4.35 10.35L8.6 14.6Z" fill="white" />
                </svg>
            );
        }
        case 'arrow-drop-left': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z" />
                </svg>
            );
        }
        case 'call': {
            return (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.23 12.26L13.69 11.97C13.08 11.9 12.48 12.11 12.05 12.54L10.21 14.38C7.38004 12.94 5.06004 10.63 3.62004 7.79001L5.47004 5.94001C5.90004 5.51001 6.11004 4.91001 6.04004 4.30001L5.75004 1.78001C5.63004 0.77001 4.78004 0.0100098 3.76004 0.0100098H2.03004C0.900041 0.0100098 -0.0399593 0.95001 0.0300407 2.08001C0.560041 10.62 7.39004 17.44 15.92 17.97C17.05 18.04 17.99 17.1 17.99 15.97V14.24C18 13.23 17.24 12.38 16.23 12.26Z" />
                </svg>
            );
        }
        case 'select-file': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H14V5H5V19H19V10H21V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM17 9V7H15V5H17V3H19V5H21V7H19V9H17ZM6 17H18L14.25 12L11.25 16L9 13L6 17Z"
                        fill="var(--text-primary)"
                    />
                </svg>
            );
        }
        case 'makePhoto': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 8V6H17V4H19V2H21V4H23V6H21V8H19ZM3 22C2.45 22 1.97917 21.8042 1.5875 21.4125C1.19583 21.0208 1 20.55 1 20V8C1 7.45 1.19583 6.97917 1.5875 6.5875C1.97917 6.19583 2.45 6 3 6H6.15L8 4H14V6H8.875L7.05 8H3V20H19V11H21V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H3ZM11 18.5C12.25 18.5 13.3125 18.0625 14.1875 17.1875C15.0625 16.3125 15.5 15.25 15.5 14C15.5 12.75 15.0625 11.6875 14.1875 10.8125C13.3125 9.9375 12.25 9.5 11 9.5C9.75 9.5 8.6875 9.9375 7.8125 10.8125C6.9375 11.6875 6.5 12.75 6.5 14C6.5 15.25 6.9375 16.3125 7.8125 17.1875C8.6875 18.0625 9.75 18.5 11 18.5ZM11 16.5C10.3 16.5 9.70833 16.2583 9.225 15.775C8.74167 15.2917 8.5 14.7 8.5 14C8.5 13.3 8.74167 12.7083 9.225 12.225C9.70833 11.7417 10.3 11.5 11 11.5C11.7 11.5 12.2917 11.7417 12.775 12.225C13.2583 12.7083 13.5 13.3 13.5 14C13.5 14.7 13.2583 15.2917 12.775 15.775C12.2917 16.2583 11.7 16.5 11 16.5Z"
                        fill="var(--text-primary)"
                    />
                </svg>
            );
        }
        case 'reload': {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    enableBackground="new 0 0 16 16"
                    version="1.1"
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                >
                    <path d="M14 8c-.609 0-.898.43-1 .883C12.635 10.516 11.084 13 8 13a4.947 4.947 0 01-2.114-.474L6.414 12c.359-.344.586-.555.586-1 0-.523-.438-1-1-1H3c-.609 0-1 .492-1 1v3c0 .541.428 1 1 1 .484 0 .688-.273 1-.594l.408-.407A6.933 6.933 0 008 15c4.99 0 7-4.75 7-5.938C15 8.336 14.469 8 14 8zM3 7.117C3.365 5.485 4.916 3 8 3c.757 0 1.473.171 2.114.473L9.586 4C9.227 4.344 9 4.555 9 5c0 .523.438 1 1 1h3c.609 0 1-.492 1-1V2c0-.541-.428-1-1-1-.484 0-.688.273-1 .594l-.408.407A6.933 6.933 0 008 1C3.01 1 1 5.75 1 6.938 1 7.664 1.531 8 2 8c.609 0 .898-.43 1-.883z" />
                </svg>
            );
        }
        case 'mute': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.73598 3.32552C4.51727 3.10694 4.16279 3.10699 3.94414 3.32564L3.32598 3.9438C3.10729 4.16249 3.10729 4.51707 3.32598 4.73576L7.08388 8.49366C7.19828 8.60806 7.19985 8.79304 7.0874 8.90936C7.03154 8.96715 6.95461 8.99978 6.87424 8.99978H3.56C3.25072 8.99978 3 9.2505 3 9.55978V14.4398C3 14.7491 3.25072 14.9998 3.56 14.9998H6.76804C6.91656 14.9998 7.059 15.0588 7.16402 15.1638L11.044 19.0438C11.3968 19.3966 12 19.1467 12 18.6478V14.7617C12 14.2628 12.6032 14.013 12.956 14.3658L15.7246 17.1343C15.9651 17.3749 15.9381 17.7745 15.6498 17.9551C15.2578 18.2007 14.8409 18.4091 14.4009 18.5693C14.1663 18.6547 14 18.8718 14 19.1215V20.0605C14 20.4192 14.333 20.6859 14.6753 20.579C15.591 20.2931 16.4454 19.8578 17.2106 19.3115C17.4426 19.1458 17.7624 19.1622 17.964 19.3638L19.264 20.6638C19.4827 20.8825 19.8373 20.8825 20.056 20.6638L20.6739 20.0459C20.8926 19.8271 20.8926 19.4725 20.6738 19.2538L4.73598 3.32552ZM10 13.8178C10 14.3167 9.3968 14.5666 9.04402 14.2138L7.99402 13.1638C7.889 13.0588 7.74656 12.9998 7.59804 12.9998H5.56C5.25072 12.9998 5 12.7491 5 12.4398V11.5598C5 11.2505 5.25072 10.9998 5.56 10.9998H7.59804C7.74656 10.9998 7.889 10.9408 7.99402 10.8358L8.31402 10.5158C8.53271 10.2971 8.88729 10.2971 9.10598 10.5158L9.83598 11.2458C9.941 11.3508 10 11.4932 10 11.6417V13.8178ZM19 11.9998C19 12.6954 18.8921 13.3694 18.7006 14.0035C18.6381 14.2105 18.6874 14.4372 18.8403 14.5901L19.5605 15.3103C19.8337 15.5834 20.2943 15.5038 20.4301 15.1421C20.7965 14.1658 21 13.1082 21 11.9998C21 7.96445 18.3421 4.55138 14.6773 3.41165C14.3343 3.30495 14 3.57181 14 3.9311V4.87215C14 5.11992 14.1638 5.33609 14.3966 5.42093C17.081 6.39921 19 8.97668 19 11.9998ZM12 5.35174C12 4.85283 11.3968 4.60298 11.044 4.95576L10.516 5.4838C10.2973 5.70249 10.2973 6.05707 10.516 6.27576L11.044 6.8038C11.3968 7.15658 12 6.90673 12 6.40782V5.35174ZM16.5 11.9998C16.5 10.5546 15.82 9.27614 14.7649 8.45276C14.4367 8.19666 14 8.45958 14 8.87588V9.52782C14 9.67634 14.059 9.81878 14.164 9.9238L16.3096 12.0694C16.3789 12.1387 16.5 12.0979 16.5 11.9998Z" />
                </svg>
            );
        }
        case 'unmute': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 20.7251V18.6751C15.5 18.2418 16.7083 17.4084 17.625 16.1751C18.5417 14.9418 19 13.5418 19 11.9751C19 10.4084 18.5417 9.00843 17.625 7.7751C16.7083 6.54176 15.5 5.70843 14 5.2751V3.2251C16.0667 3.69176 17.75 4.7376 19.05 6.3626C20.35 7.9876 21 9.85843 21 11.9751C21 14.0918 20.35 15.9626 19.05 17.5876C17.75 19.2126 16.0667 20.2584 14 20.7251ZM3 15.0001V9.0001H7L12 4.0001V20.0001L7 15.0001H3ZM14 16.0001V7.9501C14.7833 8.31676 15.3958 8.86676 15.8375 9.6001C16.2792 10.3334 16.5 11.1334 16.5 12.0001C16.5 12.8501 16.2792 13.6376 15.8375 14.3626C15.3958 15.0876 14.7833 15.6334 14 16.0001ZM10 8.8501L7.85 11.0001H5V13.0001H7.85L10 15.1501V8.8501Z" />
                </svg>
            );
        }
        case 'error': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                        fill="#c0392b"
                        d="M22 1041.4c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
                        transform="translate(0 -1028.4)"
                    />
                    <path
                        fill="#e74c3c"
                        d="M22 1040.4c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
                        transform="translate(0 -1028.4)"
                    />
                    <path
                        fill="#c0392b"
                        d="M7.05 1037.8l3.536 3.6-3.536 3.5 1.415 1.4 3.535-3.5 3.536 3.5 1.414-1.4-3.536-3.5 3.536-3.6-1.414-1.4-3.536 3.5-3.535-3.5-1.415 1.4z"
                        transform="translate(0 -1028.4)"
                    />
                    <path
                        fill="#ecf0f1"
                        d="M7.05 1036.8l3.536 3.6-3.536 3.5 1.415 1.4 3.535-3.5 3.536 3.5 1.414-1.4-3.536-3.5 3.536-3.6-1.414-1.4-3.536 3.5-3.535-3.5-1.415 1.4z"
                        transform="translate(0 -1028.4)"
                    />
                </svg>
            );
        }
        case 'save': {
            return (
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M433.941 129.941l-83.882-83.882A48 48 0 00316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 00-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 01-6-6V86a6 6 0 016-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 011.757 4.243V426a6 6 0 01-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z" />
                </svg>
            );
        }
        case 'support': {
            return (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.168 2.02344H5.83464C3.33464 2.02344 1.66797 3.6901 1.66797 6.1901V11.1901C1.66797 13.6901 3.33464 15.3568 5.83464 15.3568V17.1318C5.83464 17.7984 6.5763 18.1984 7.1263 17.8234L10.8346 15.3568H14.168C16.668 15.3568 18.3346 13.6901 18.3346 11.1901V6.1901C18.3346 3.6901 16.668 2.02344 14.168 2.02344ZM10.0013 12.1651C9.6513 12.1651 9.3763 11.8818 9.3763 11.5401C9.3763 11.1984 9.6513 10.9151 10.0013 10.9151C10.3513 10.9151 10.6263 11.1984 10.6263 11.5401C10.6263 11.8818 10.3513 12.1651 10.0013 12.1651ZM11.0513 8.70677C10.7263 8.92344 10.6263 9.0651 10.6263 9.29844V9.47344C10.6263 9.8151 10.343 10.0984 10.0013 10.0984C9.65964 10.0984 9.3763 9.8151 9.3763 9.47344V9.29844C9.3763 8.33177 10.0846 7.85677 10.3513 7.67344C10.6596 7.4651 10.7596 7.32344 10.7596 7.10677C10.7596 6.6901 10.418 6.34844 10.0013 6.34844C9.58464 6.34844 9.24297 6.6901 9.24297 7.10677C9.24297 7.44844 8.95964 7.73177 8.61797 7.73177C8.2763 7.73177 7.99297 7.44844 7.99297 7.10677C7.99297 5.99844 8.89297 5.09844 10.0013 5.09844C11.1096 5.09844 12.0096 5.99844 12.0096 7.10677C12.0096 8.05677 11.3096 8.53177 11.0513 8.70677Z" />
                </svg>
            );
        }
        case 'privacy-policy': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" fill="none" viewBox="0 0 14 18">
                    <path
                        fill="#A5ABD7"
                        d="M7 17.333c-1.93-.486-3.524-1.593-4.781-3.323C.962 12.281.333 10.361.333 8.25V3.167L7 .667l6.667 2.5V8.25c0 2.111-.629 4.031-1.886 5.76-1.257 1.73-2.85 2.837-4.78 3.323zm0-1.75c1.445-.458 2.639-1.375 3.584-2.75A7.915 7.915 0 0012 8.25V4.313L7 2.438 2 4.313V8.25c0 1.68.472 3.208 1.417 4.583.944 1.375 2.139 2.292 3.583 2.75zm-1.667-3.25h3.334c.236 0 .434-.08.594-.24.16-.159.24-.357.24-.593V9a.806.806 0 00-.24-.594.806.806 0 00-.594-.24v-.833c0-.458-.163-.85-.49-1.177A1.605 1.605 0 007 5.666c-.458 0-.85.164-1.177.49-.326.327-.49.719-.49 1.177v.834a.806.806 0 00-.593.24A.806.806 0 004.5 9v2.5c0 .236.08.434.24.594.16.16.357.24.593.24zm.834-4.166v-.834c0-.236.08-.434.24-.593.16-.16.357-.24.593-.24s.434.08.594.24c.16.16.24.357.24.593v.834H6.167z"
                    />
                </svg>
            );
        }
        case 'group-chat': {
            return (
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 2, marginBottom: 2 }}>
                    <path
                        d="M4.04194 7.90232V6.87109H3.08327C2.65316 6.87109 2.30078 7.22347 2.30078 7.65358V10.4208C2.30078 10.4208 2.30078 10.426 2.30078 10.4312V12.4314L3.60665 11.1981H8.38967C8.82496 11.1981 9.17216 10.8457 9.17216 10.4156V9.18746H5.33227C4.61715 9.18746 4.03676 8.60707 4.03676 7.89714L4.04194 7.90232Z"
                        fill="#7B57C8"
                    />
                    <path
                        d="M10.6488 2.88086H5.33717C4.90707 2.88086 4.55469 3.22806 4.55469 3.66335V7.90225C4.55469 8.33236 4.90707 8.67956 5.33717 8.67956H10.1202L11.4312 9.91288V3.66335C11.4312 3.22806 11.084 2.88086 10.6488 2.88086Z"
                        fill="#7B57C8"
                    />
                </svg>
            );
        }
        case 'not-authorized': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="4" width="22" height="16" rx="8" fill="#A5ABD7" />
                    <path
                        d="M14.0146 6.66602H8.25522C6.68066 6.66602 5.40002 7.96666 5.40002 9.55712V12.6744C5.40002 14.1801 6.5477 15.403 8.00329 15.5373V17.3115C8.00329 17.5094 8.24822 17.6155 8.38819 17.467L10.2567 15.5655H12.3211C12.2791 15.3535 12.2581 15.1343 12.2581 14.9081C12.2581 14.6819 12.2791 14.4487 12.3211 14.2295H8.25522C7.40846 14.2295 6.71566 13.5297 6.71566 12.6744V9.55712C6.71566 8.70181 7.40846 8.002 8.25522 8.002H14.0146C14.8614 8.002 15.5542 8.70181 15.5542 9.55712V11.3455C15.6382 11.3314 15.7151 11.3314 15.7991 11.3314C16.177 11.3314 16.5339 11.3879 16.8768 11.501V9.55712C16.8768 7.96666 15.5962 6.66602 14.0146 6.66602Z"
                        fill="white"
                    />
                    <path
                        d="M9.04554 11.8901C9.47068 11.8901 9.81532 11.542 9.81532 11.1125C9.81532 10.6831 9.47068 10.335 9.04554 10.335C8.6204 10.335 8.27576 10.6831 8.27576 11.1125C8.27576 11.542 8.6204 11.8901 9.04554 11.8901Z"
                        fill="white"
                    />
                    <path
                        d="M11.1244 11.8901C11.5495 11.8901 11.8942 11.542 11.8942 11.1125C11.8942 10.6831 11.5495 10.335 11.1244 10.335C10.6993 10.335 10.3546 10.6831 10.3546 11.1125C10.3546 11.542 10.6993 11.8901 11.1244 11.8901Z"
                        fill="white"
                    />
                    <path
                        d="M13.2239 11.8901C13.649 11.8901 13.9937 11.542 13.9937 11.1125C13.9937 10.6831 13.649 10.335 13.2239 10.335C12.7987 10.335 12.4541 10.6831 12.4541 11.1125C12.4541 11.542 12.7987 11.8901 13.2239 11.8901Z"
                        fill="white"
                    />
                    <path
                        d="M16.8765 12.2433C16.5476 12.109 16.1837 12.0312 15.7988 12.0312C15.7148 12.0312 15.6378 12.0312 15.5538 12.0454C14.3222 12.1443 13.3145 13.0421 13.0345 14.2296C12.9786 14.4488 12.9506 14.675 12.9506 14.9082C12.9506 15.1415 12.9786 15.3535 13.0275 15.5656C13.3215 16.838 14.4481 17.7852 15.7988 17.7852C17.3733 17.7852 18.654 16.4987 18.654 14.9082C18.654 13.6995 17.9192 12.6674 16.8765 12.2433ZM17.0374 15.3394C17.2544 15.5656 17.2544 15.9261 17.0374 16.1523C16.8135 16.3785 16.4566 16.3785 16.2326 16.1523L15.7988 15.7211L15.3719 16.1523C15.1479 16.3785 14.791 16.3785 14.5671 16.1523C14.3502 15.9261 14.3502 15.5656 14.5671 15.3394L15.001 14.9082L14.5671 14.477C14.3502 14.2508 14.3502 13.8903 14.5671 13.6641C14.791 13.4379 15.1479 13.4379 15.3719 13.6641L15.7988 14.0953L16.2326 13.6641C16.4566 13.4379 16.8135 13.4379 17.0374 13.6641C17.2544 13.8903 17.2544 14.2508 17.0374 14.477L16.6035 14.9082L17.0374 15.3394Z"
                        fill="white"
                    />
                </svg>
            );
        }
        case 'keyboard': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-keyboard" viewBox="0 0 16 16">
                    <path d="M14 5a1 1 0 011 1v5a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1h12zM2 4a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H2z" />
                    <path d="M13 10.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5a.25.25 0 01-.25-.25v-.5zm0-2a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5a.25.25 0 01-.25-.25v-.5zm-5 0A.25.25 0 018.25 8h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 018 8.75v-.5zm2 0a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25v-.5zm1 2a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5a.25.25 0 01-.25-.25v-.5zm-5-2A.25.25 0 016.25 8h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 016 8.75v-.5zm-2 0A.25.25 0 014.25 8h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 014 8.75v-.5zm-2 0A.25.25 0 012.25 8h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 012 8.75v-.5zm11-2a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5a.25.25 0 01-.25-.25v-.5zm-2 0a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5a.25.25 0 01-.25-.25v-.5zm-2 0A.25.25 0 019.25 6h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 019 6.75v-.5zm-2 0A.25.25 0 017.25 6h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 017 6.75v-.5zm-2 0A.25.25 0 015.25 6h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5A.25.25 0 015 6.75v-.5zm-3 0A.25.25 0 012.25 6h1.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-1.5A.25.25 0 012 6.75v-.5zm0 4a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-.5a.25.25 0 01-.25-.25v-.5zm2 0a.25.25 0 01.25-.25h5.5a.25.25 0 01.25.25v.5a.25.25 0 01-.25.25h-5.5a.25.25 0 01-.25-.25v-.5z" />
                </svg>
            );
        }
        case 'melody': {
            return (
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path
                        d="M29.62 2.22a1 1 0 00-.85-.22l-17 4A1 1 0 0011 7v13.26A5.45 5.45 0 007.5 19a5.5 5.5 0 105.5 5.5V13.79l15-3.53v10A5.45 5.45 0 0024.5 19a5.5 5.5 0 105.5 5.5V3a1 1 0 00-.38-.78zM7.5 28a3.5 3.5 0 113.5-3.5A3.5 3.5 0 017.5 28zM13 11.74V7.79l15-3.53v4zM24.5 28a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z"
                        data-name="music, audio, multimedia, note, song, sound, research"
                    />
                </svg>
            );
        }
        case 'portfolio': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <mask id="mask0_12429_135177" style={{ maskType: 'alpha' }} width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="url(#pattern0)" d="M0.5 0.5H19.5V19.5H0.5z" />
                    </mask>
                    <g mask="url(#mask0_12429_135177)">
                        <path fill="#717394" d="M0.5 0.5H19.5V19.5H0.5z" />
                    </g>
                    <defs>
                        <pattern id="pattern0" width="1" height="1" patternContentUnits="objectBoundingBox">
                            <use transform="scale(.00195)" xlinkHref="#image0_12429_135177" />
                        </pattern>
                        <image
                            id="image0_12429_135177"
                            width="512"
                            height="512"
                            xlinkHref="data:image/png;base64,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"
                        />
                    </defs>
                </svg>
            );
        }
        case 'group': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="7" r="4" stroke="#7B57C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16 3.13086C17.7699 3.58403 19.0078 5.17885 19.0078 7.00586C19.0078 8.83287 17.7699 10.4277 16 10.8809"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M21 21.0004V19.0004C20.9896 17.185 19.7578 15.6042 18 15.1504" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }
        case 'forward-black': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2352 7.14891V5.21879C12.2352 4.1384 13.482 3.59214 14.2092 4.35691L20.6623 11.1427C21.1126 11.6161 21.1126 12.3809 20.6623 12.8543L14.2092 19.6401C13.482 20.4049 12.2352 19.8707 12.2352 18.7904V16.8602H4.1544C3.51948 16.8602 3 16.314 3 15.6463V8.36283C3 7.69517 3.51948 7.14891 4.1544 7.14891H12.2352Z" />
                </svg>
            );
        }
        case 'lock': {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width={size} height={size}>
                    <path d="M4 8V6a6 6 0 1112 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 10-2 0zM7 6v2h6V6a3 3 0 00-6 0z" />
                </svg>
            );
        }
        case 'reply-black': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4947 7.8623V6.10785C10.4947 5.1258 9.26687 4.62926 8.55066 5.32442L3.33253 10.3892C2.88916 10.8195 2.88916 11.5146 3.33253 11.945L8.55066 17.0097C9.26687 17.7049 10.4947 17.2194 10.4947 16.2373V14.3725C16.1789 14.3725 20.1579 16.138 23 20C21.8632 14.4829 18.4526 8.96573 10.4947 7.8623Z" />
                </svg>
            );
        }
        case 'clock': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.991 3C7.023 3 3 7.032 3 12C3 16.968 7.023 21 11.991 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 11.991 3ZM12 19.2C8.022 19.2 4.8 15.978 4.8 12C4.8 8.022 8.022 4.8 12 4.8C15.978 4.8 19.2 8.022 19.2 12C19.2 15.978 15.978 19.2 12 19.2ZM11.802 7.5H11.748C11.388 7.5 11.1 7.788 11.1 8.148V12.396C11.1 12.711 11.262 13.008 11.541 13.17L15.276 15.411C15.582 15.591 15.978 15.501 16.158 15.195C16.347 14.889 16.248 14.484 15.933 14.304L12.45 12.234V8.148C12.45 7.788 12.162 7.5 11.802 7.5Z" />
                </svg>
            );
        }
        case 'check-circle': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.88 8.29L10 14.17L8.12 12.29C7.73 11.9 7.1 11.9 6.71 12.29C6.32 12.68 6.32 13.31 6.71 13.7L9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L17.3 9.7C17.69 9.31 17.69 8.68 17.3 8.29C16.91 7.9 16.27 7.9 15.88 8.29Z" />
                </svg>
            );
        }
        case 'redirect': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00002 10.0006C5.79092 10.0006 4.0001 11.7914 4.00006 14.0005L4 18.0005C3.99999 18.5528 4.44771 19.0005 5 19.0005C5.55228 19.0005 5.99999 18.5528 6 18.0006L6.00006 14.0006C6.00008 12.896 6.89549 12.0006 8.00004 12.0006L15.689 12.0005C15.8672 12.0005 15.9565 12.216 15.8305 12.342L12.9293 15.2432C12.5388 15.6337 12.5388 16.2668 12.9293 16.6574C13.3198 17.0479 13.953 17.0479 14.3435 16.6574L19.2933 11.7076C19.6838 11.3171 19.6838 10.684 19.2933 10.2934L14.3435 5.34367C13.953 4.95315 13.3198 4.95315 12.9293 5.34367C12.5388 5.7342 12.5388 6.36736 12.9293 6.75788L15.8306 9.65912C15.9566 9.78511 15.8673 10.0005 15.6891 10.0005L8.00002 10.0006Z" />
                </svg>
            );
        }
        case 'copy': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5263 2H4.78947C3.80526 2 3 2.81818 3 3.81818V16.5455H4.78947V3.81818H15.5263V2ZM18.2105 5.63636H8.36842C7.38421 5.63636 6.57895 6.45455 6.57895 7.45455V20.1818C6.57895 21.1818 7.38421 22 8.36842 22H18.2105C19.1947 22 20 21.1818 20 20.1818V7.45455C20 6.45455 19.1947 5.63636 18.2105 5.63636ZM18.2105 20.1818H8.36842V7.45455H18.2105V20.1818Z" />
                </svg>
            );
        }
        case 'pin': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.3993 2.70696C12.7899 2.31643 13.423 2.31643 13.8136 2.70695L20.8846 9.77801C21.2752 10.1685 21.2752 10.8017 20.8846 11.1922L20.7668 11.3101C20.4414 11.6355 19.9137 11.6355 19.5883 11.3101C19.5232 11.245 19.4177 11.245 19.3526 11.3101L15.6559 15.0067C15.3767 15.2859 15.1864 15.6415 15.109 16.0287L14.6118 18.5146C14.5524 18.8118 14.4063 19.0848 14.192 19.2991C13.5924 19.8986 12.6204 19.8986 12.0209 19.2991L9.14664 16.4248C8.99043 16.2686 8.73717 16.2686 8.58096 16.4248L4.62116 20.3846C4.23064 20.7751 3.59748 20.7751 3.20696 20.3846C2.81643 19.9941 2.81643 19.3609 3.20696 18.9704L7.16675 15.0106C7.32296 14.8544 7.32296 14.6012 7.16675 14.445L4.29248 11.5706C3.69296 10.9711 3.69296 9.9991 4.29249 9.39958C4.5068 9.18528 4.77975 9.0392 5.07694 8.97976L7.56291 8.48256C7.95009 8.40513 8.30569 8.21482 8.58489 7.93562L12.2815 4.23902C12.3466 4.17393 12.3466 4.0684 12.2815 4.00332C11.9561 3.67788 11.9561 3.15025 12.2815 2.82481L12.3993 2.70696ZM14.5206 6.24248C14.1301 5.85196 13.497 5.85197 13.1064 6.24249L9.57091 9.77803C9.29171 10.0572 8.93611 10.2475 8.54893 10.325L6.68728 10.6973C6.53065 10.7286 6.47214 10.9219 6.58509 11.0349L12.5567 17.0065C12.6696 17.1194 12.8629 17.0609 12.8942 16.9043L13.2666 15.0426C13.344 14.6554 13.5343 14.2998 13.8135 14.0206L17.3491 10.4851C17.7396 10.0946 17.7396 9.46144 17.3491 9.07091L14.5206 6.24248Z" />
                </svg>
            );
        }
        case 'edit': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.793 2.79279C15.9805 2.60532 16.2348 2.5 16.5 2.5C16.7652 2.5 17.0195 2.60532 17.207 2.79279L21.207 6.79279C21.3945 6.98031 21.4998 7.23462 21.4998 7.49979C21.4998 7.76495 21.3945 8.01926 21.207 8.20679L8.207 21.2068C8.01951 21.3943 7.76519 21.4997 7.5 21.4998H3.5C3.23478 21.4998 2.98043 21.3944 2.79289 21.2069C2.60536 21.0194 2.5 20.765 2.5 20.4998V16.4998C2.50006 16.2346 2.60545 15.9803 2.793 15.7928L12.793 5.79279L15.793 2.79279ZM13.5 7.91379L4.5 16.9138V19.4998H7.086L16.086 10.4998L13.5 7.91379ZM17.5 9.08579L19.086 7.49979L16.5 4.91379L14.914 6.49979L17.5 9.08579Z" />
                </svg>
            );
        }
        case 'reply': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0002 10.0006C18.2093 10.0006 20.0002 11.7915 20.0002 14.0006L20.0002 18.0005C20.0002 18.5528 19.5525 19.0005 19.0002 19.0005C18.448 19.0005 18.0002 18.5528 18.0002 18.0006L18.0002 14.0006C18.0002 12.896 17.1048 12.0006 16.0002 12.0006L8.31116 12.0005C8.13297 12.0005 8.04374 12.216 8.16973 12.342L11.071 15.2432C11.4615 15.6337 11.4615 16.2668 11.0709 16.6574C10.6804 17.0479 10.0472 17.0479 9.65669 16.6574L4.70695 11.7076C4.31643 11.3171 4.31643 10.684 4.70696 10.2934L9.65671 5.34367C10.0472 4.95315 10.6804 4.95315 11.0709 5.34367C11.4615 5.73419 11.4615 6.36737 11.0709 6.7579L8.16967 9.65912C8.04368 9.78512 8.13291 10.0005 8.31109 10.0005L16.0002 10.0006Z" />
                </svg>
            );
        }
        case 'emoji': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.5 11C16.3284 11 17 10.3284 17 9.5C17 8.67157 16.3284 8 15.5 8C14.6716 8 14 8.67157 14 9.5C14 10.3284 14.6716 11 15.5 11Z"
                        fill="#717394"
                    />
                    <path
                        d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
                        fill="#717394"
                    />
                    <path
                        d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM16.41 13.89C16.06 13.67 15.59 13.78 15.38 14.13C14.64 15.3 13.38 16 12 16C10.62 16 9.36 15.3 8.62 14.12C8.4 13.77 7.94 13.66 7.59 13.88C7.24 14.1 7.13 14.56 7.35 14.91C8.37 16.54 10.1 17.5 12 17.5C13.9 17.5 15.63 16.53 16.65 14.92C16.87 14.57 16.76 14.11 16.41 13.89Z"
                        fill="#717394"
                    />
                </svg>
            );
        }
        case 'send': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.4 20.4005L21.85 12.9205C22.66 12.5705 22.66 11.4305 21.85 11.0805L4.4 3.60051C3.74 3.31051 3.01 3.80051 3.01 4.51051L3 9.12051C3 9.62051 3.37 10.0505 3.87 10.1105L18 12.0005L3.87 13.8805C3.37 13.9505 3 14.3805 3 14.8805L3.01 19.4905C3.01 20.2005 3.74 20.6905 4.4 20.4005Z"
                        fill="#7B57C8"
                    />
                </svg>
            );
        }
        case 'attach-file': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 6.74917V17.3292C16.5 19.4192 14.97 21.2792 12.89 21.4792C10.5 21.7092 8.5 19.8392 8.5 17.4992V5.13917C8.5 3.82917 9.44 2.63917 10.74 2.50917C12.24 2.35917 13.5 3.52917 13.5 4.99917V15.4992C13.5 16.0492 13.05 16.4992 12.5 16.4992C11.95 16.4992 11.5 16.0492 11.5 15.4992V6.74917C11.5 6.33917 11.16 5.99917 10.75 5.99917C10.34 5.99917 10 6.33917 10 6.74917V15.3592C10 16.6692 10.94 17.8592 12.24 17.9892C13.74 18.1392 15 16.9692 15 15.4992V5.16917C15 3.07917 13.47 1.21917 11.39 1.01917C9.01 0.789169 7 2.65917 7 4.99917V17.2692C7 20.1392 9.1 22.7092 11.96 22.9792C15.25 23.2792 18 20.7192 18 17.4992V6.74917C18 6.33917 17.66 5.99917 17.25 5.99917C16.84 5.99917 16.5 6.33917 16.5 6.74917Z" />
                </svg>
            );
        }
        case 'new-message': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6 5C5.46957 5 4.96086 5.21071 4.58579 5.58579C4.21071 5.96086 4 6.46957 4 7V15C4 15.5304 4.21071 16.0391 4.58579 16.4142C4.96086 16.7893 5.46957 17 6 17H8C8.55228 17 9 17.4477 9 18V19.2338L11.4955 17.7365C11.9691 17.4524 12.5833 17.6059 12.8675 18.0795C13.1516 18.5531 12.9981 19.1673 12.5245 19.4515L8.5145 21.8575C8.20556 22.0429 7.82081 22.0477 7.5073 21.8702C7.19379 21.6927 7 21.3603 7 21V19H6C4.93913 19 3.92172 18.5786 3.17157 17.8284C2.42143 17.0783 2 16.0609 2 15V7C2 5.93913 2.42143 4.92172 3.17157 4.17157C3.92172 3.42143 4.93913 3 6 3H18C19.0609 3 20.0783 3.42143 20.8284 4.17157C21.5786 4.92172 22 5.93913 22 7V12.5C22 13.0523 21.5523 13.5 21 13.5C20.4477 13.5 20 13.0523 20 12.5V7C20 6.46957 19.7893 5.96086 19.4142 5.58579C19.0391 5.21071 18.5304 5 18 5H6ZM7 9C7 8.44772 7.44772 8 8 8H16C16.5523 8 17 8.44772 17 9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9ZM7 13C7 12.4477 7.44772 12 8 12H14C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14H8C7.44772 14 7 13.5523 7 13ZM19 15C19.5523 15 20 15.4477 20 16V18H22C22.5523 18 23 18.4477 23 19C23 19.5523 22.5523 20 22 20H20V22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22V20H16C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18H18V16C18 15.4477 18.4477 15 19 15Z"
                    />
                </svg>
            );
        }
        case 'call-end': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.13188 15.7302L6.98313 14.2585C7.42742 13.9068 7.6866 13.3699 7.6866 12.8053V10.3987C10.482 9.49163 13.5088 9.48238 16.3134 10.3987V12.8146C16.3134 13.3792 16.5726 13.916 17.0169 14.2678L18.8589 15.7302C19.5994 16.3134 20.6546 16.2578 21.321 15.5914L22.4503 14.4622C23.1908 13.7217 23.1908 12.4906 22.404 11.7964C16.4708 6.55745 7.52924 6.55745 1.596 11.7964C0.809222 12.4906 0.809222 13.7217 1.54972 14.4622L2.67898 15.5914C3.33617 16.2578 4.39138 16.3134 5.13188 15.7302Z" />
                </svg>
            );
        }
        case 'microphone-off': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 11.6V6C15 4.34 13.66 3 12 3C10.46 3 9.20998 4.16 9.03998 5.65L15 11.6ZM18.08 12C17.67 12 17.31 12.3 17.25 12.71C17.2 13.03 17.13 13.35 17.03 13.64L18.3 14.91C18.6 14.31 18.82 13.66 18.93 12.97C19 12.46 18.6 12 18.08 12ZM3.70998 4.56C3.31998 4.95 3.31998 5.58 3.70998 5.97L8.99998 11.27V11.7C8.99998 12.89 9.59998 14.02 10.63 14.61C11.38 15.04 12.04 15.05 12.65 14.92L14.31 16.58C13.6 16.91 12.81 17.1 12 17.1C9.45998 17.1 7.11998 15.33 6.74998 12.71C6.68998 12.3 6.32998 12 5.91998 12C5.39998 12 4.99998 12.46 5.06998 12.97C5.52998 15.93 8.02998 18.27 11 18.72V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V18.72C13.91 18.59 14.77 18.27 15.55 17.82L19.04 21.31C19.43 21.7 20.06 21.7 20.45 21.31C20.84 20.92 20.84 20.29 20.45 19.9L5.11998 4.56C4.72998 4.17 4.09998 4.17 3.70998 4.56Z" />
                </svg>
            );
        }
        case 'microphone': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3C10.34 3 8.99999 4.34 8.99999 6V12C8.99999 13.66 10.34 15 12 15ZM17.91 12C17.42 12 17.01 12.36 16.93 12.85C16.52 15.2 14.47 17 12 17C9.52999 17 7.47999 15.2 7.06999 12.85C6.98999 12.36 6.57999 12 6.08999 12C5.47999 12 4.99999 12.54 5.08999 13.14C5.57999 16.14 7.97999 18.49 11 18.92V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V18.92C16.02 18.49 18.42 16.14 18.91 13.14C19.01 12.54 18.52 12 17.91 12Z" />
                </svg>
            );
        }
        case 'arrow-drop-down': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.9709 9.1697C16.7835 8.98345 16.5301 8.87891 16.2659 8.87891C16.0017 8.87891 15.7483 8.98345 15.5609 9.1697L11.9709 12.7097L8.4309 9.1697C8.24353 8.98345 7.99008 8.87891 7.7259 8.87891C7.46171 8.87891 7.20826 8.98345 7.0209 9.1697C6.92717 9.26266 6.85277 9.37326 6.802 9.49512C6.75124 9.61698 6.7251 9.74769 6.7251 9.8797C6.7251 10.0117 6.75124 10.1424 6.802 10.2643C6.85277 10.3861 6.92717 10.4967 7.0209 10.5897L11.2609 14.8297C11.3539 14.9234 11.4645 14.9978 11.5863 15.0486C11.7082 15.0994 11.8389 15.1255 11.9709 15.1255C12.1029 15.1255 12.2336 15.0994 12.3555 15.0486C12.4773 14.9978 12.5879 14.9234 12.6809 14.8297L16.9709 10.5897C17.0646 10.4967 17.139 10.3861 17.1898 10.2643C17.2406 10.1424 17.2667 10.0117 17.2667 9.8797C17.2667 9.74769 17.2406 9.61698 17.1898 9.49512C17.139 9.37326 17.0646 9.26266 16.9709 9.1697Z" />
                </svg>
            );
        }
        case 'arrow-drop-up': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.9977 13.4098L12.6985 9.16982C12.6054 9.07609 12.4945 9.0017 12.3724 8.95093C12.2503 8.90016 12.1193 8.87402 11.987 8.87402C11.8547 8.87402 11.7237 8.90016 11.6016 8.95093C11.4795 9.0017 11.3687 9.07609 11.2755 9.16982L7.02641 13.4098C6.93248 13.5028 6.85793 13.6134 6.80705 13.7352C6.75617 13.8571 6.72998 13.9878 6.72998 14.1198C6.72998 14.2518 6.75617 14.3825 6.80705 14.5044C6.85793 14.6263 6.93248 14.7369 7.02641 14.8298C7.21418 15.0161 7.46817 15.1206 7.73292 15.1206C7.99767 15.1206 8.25167 15.0161 8.43943 14.8298L11.987 11.2898L15.5346 14.8298C15.7213 15.0146 15.9732 15.1187 16.2361 15.1198C16.368 15.1206 16.4987 15.0954 16.6208 15.0456C16.7429 14.9958 16.854 14.9225 16.9476 14.8298C17.0449 14.7402 17.1234 14.6322 17.1786 14.5122C17.2339 14.3921 17.2647 14.2623 17.2694 14.1302C17.274 13.9982 17.2524 13.8666 17.2058 13.7429C17.1592 13.6193 17.0884 13.506 16.9977 13.4098Z"
                        fill="var(--text-primary)"
                    />
                </svg>
            );
        }
        case 'arrow-left': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9999 11.0002H7.82992L12.7099 6.12016C13.0999 5.73016 13.0999 5.09016 12.7099 4.70016C12.6174 4.60746 12.5075 4.53391 12.3865 4.48373C12.2656 4.43354 12.1359 4.40771 12.0049 4.40771C11.874 4.40771 11.7443 4.43354 11.6233 4.48373C11.5023 4.53391 11.3924 4.60746 11.2999 4.70016L4.70992 11.2902C4.61722 11.3827 4.54367 11.4926 4.49349 11.6135C4.44331 11.7345 4.41748 11.8642 4.41748 11.9952C4.41748 12.1261 4.44331 12.2558 4.49349 12.3768C4.54367 12.4978 4.61722 12.6076 4.70992 12.7002L11.2999 19.2902C11.3925 19.3827 11.5024 19.4562 11.6234 19.5063C11.7443 19.5564 11.874 19.5822 12.0049 19.5822C12.1359 19.5822 12.2655 19.5564 12.3865 19.5063C12.5074 19.4562 12.6173 19.3827 12.7099 19.2902C12.8025 19.1976 12.8759 19.0877 12.9261 18.9667C12.9762 18.8457 13.0019 18.7161 13.0019 18.5852C13.0019 18.4542 12.9762 18.3246 12.9261 18.2036C12.8759 18.0827 12.8025 17.9727 12.7099 17.8802L7.82992 13.0002H18.9999C19.5499 13.0002 19.9999 12.5502 19.9999 12.0002C19.9999 11.4502 19.5499 11.0002 18.9999 11.0002Z" />
                </svg>
            );
        }
        case 'search': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.7192 20.3109L18.0114 16.6309C19.4506 14.8353 20.1476 12.5562 19.959 10.2622C19.7705 7.9682 18.7106 5.83368 16.9975 4.29754C15.2844 2.76141 13.0481 1.94041 10.7486 2.00337C8.44911 2.06633 6.26109 3.00846 4.63448 4.63604C3.00786 6.26362 2.06629 8.45294 2.00337 10.7538C1.94045 13.0547 2.76095 15.2923 4.29618 17.0064C5.83141 18.7206 7.96466 19.781 10.2573 19.9697C12.5499 20.1584 14.8277 19.461 16.6222 18.0209L20.3 21.7009C20.3929 21.7946 20.5035 21.869 20.6253 21.9198C20.747 21.9706 20.8777 21.9967 21.0096 21.9967C21.1415 21.9967 21.2722 21.9706 21.3939 21.9198C21.5157 21.869 21.6263 21.7946 21.7192 21.7009C21.8993 21.5144 22 21.2652 22 21.0059C22 20.7466 21.8993 20.4974 21.7192 20.3109ZM11.0155 18.0209C9.63189 18.0209 8.27932 17.6104 7.12886 16.8412C5.9784 16.072 5.08172 14.9788 4.55223 13.6997C4.02273 12.4206 3.88419 11.0131 4.15412 9.65527C4.42406 8.2974 5.09035 7.05012 6.06873 6.07115C7.04712 5.09219 8.29366 4.4255 9.65072 4.1554C11.0078 3.88531 12.4144 4.02393 13.6927 4.55374C14.9711 5.08356 16.0637 5.98076 16.8324 7.13191C17.6011 8.28305 18.0114 9.63643 18.0114 11.0209C18.0114 12.8774 17.2743 14.6579 15.9623 15.9706C14.6504 17.2834 12.871 18.0209 11.0155 18.0209Z" />
                </svg>
            );
        }
        case 'add-contact': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z" />
                    <path d="M9 14C6.33 14 1 15.34 1 18V19C1 19.55 1.45 20 2 20H16C16.55 20 17 19.55 17 19V18C17 15.34 11.67 14 9 14Z" />
                    <path d="M20 10V7H18V10H15V12H18V15H20V12H23V10H20Z" />
                </svg>
            );
        }
        case 'close': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6434 11.9951L18.6552 6.99422C18.8747 6.77471 18.998 6.477 18.998 6.16657C18.998 5.85614 18.8747 5.55842 18.6552 5.33892C18.4358 5.11941 18.1381 4.99609 17.8277 4.99609C17.5173 4.99609 17.2196 5.11941 17.0002 5.33892L12 10.3515L6.99983 5.33892C6.78036 5.11941 6.48268 4.99609 6.1723 4.99609C5.86191 4.99609 5.56424 5.11941 5.34476 5.33892C5.12529 5.55842 5.00199 5.85614 5.00199 6.16657C5.00199 6.477 5.12529 6.77471 5.34476 6.99422L10.3566 11.9951L5.34476 16.996C5.23552 17.1043 5.14881 17.2333 5.08964 17.3753C5.03047 17.5174 5 17.6697 5 17.8236C5 17.9775 5.03047 18.1299 5.08964 18.2719C5.14881 18.414 5.23552 18.5429 5.34476 18.6513C5.45312 18.7605 5.58203 18.8473 5.72406 18.9064C5.86609 18.9656 6.01843 18.9961 6.1723 18.9961C6.32616 18.9961 6.47851 18.9656 6.62054 18.9064C6.76257 18.8473 6.89148 18.7605 6.99983 18.6513L12 13.6387L17.0002 18.6513C17.1085 18.7605 17.2374 18.8473 17.3795 18.9064C17.5215 18.9656 17.6738 18.9961 17.8277 18.9961C17.9816 18.9961 18.1339 18.9656 18.2759 18.9064C18.418 18.8473 18.5469 18.7605 18.6552 18.6513C18.7645 18.5429 18.8512 18.414 18.9104 18.2719C18.9695 18.1299 19 17.9775 19 17.8236C19 17.6697 18.9695 17.5174 18.9104 17.3753C18.8512 17.2333 18.7645 17.1043 18.6552 16.996L13.6434 11.9951Z" />
                </svg>
            );
        }
        case 'check': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.7251 8.23151C17.6457 8.15815 17.5513 8.09993 17.4472 8.06019C17.3432 8.02046 17.2316 8 17.1189 8C17.0062 8 16.8946 8.02046 16.7905 8.06019C16.6865 8.09993 16.592 8.15815 16.5126 8.23151L10.1514 14.0701L7.47882 11.6126C7.3964 11.5396 7.29911 11.4822 7.1925 11.4437C7.08589 11.4052 6.97205 11.3863 6.85748 11.3881C6.74291 11.39 6.62985 11.4124 6.52476 11.4543C6.41967 11.4962 6.3246 11.5566 6.24499 11.6322C6.16538 11.7077 6.10278 11.7969 6.06077 11.8946C6.01875 11.9923 5.99815 12.0967 6.00013 12.2017C6.00211 12.3067 6.02664 12.4103 6.07232 12.5066C6.11799 12.603 6.18392 12.6901 6.26634 12.7631L9.54515 15.7685C9.62453 15.8418 9.71897 15.9001 9.82302 15.9398C9.92707 15.9795 10.0387 16 10.1514 16C10.2641 16 10.3757 15.9795 10.4798 15.9398C10.5838 15.9001 10.6783 15.8418 10.7576 15.7685L17.7251 9.38201C17.8118 9.30872 17.881 9.21977 17.9283 9.12077C17.9756 9.02176 18 8.91485 18 8.80676C18 8.69867 17.9756 8.59176 17.9283 8.49275C17.881 8.39375 17.8118 8.3048 17.7251 8.23151Z" />
                </svg>
            );
        }
        case 'double-check': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6977 7.26314C16.3498 6.92249 15.7876 6.92249 15.4397 7.26314L10.4073 12.1894L11.6654 13.4209L16.6977 8.48596C17.0368 8.15405 17.0368 7.59505 16.6977 7.26314ZM20.4809 7.2544L11.6654 15.8841L8.56034 12.8532C8.21236 12.5126 7.65023 12.5126 7.30225 12.8532C6.95427 13.1939 6.95427 13.7441 7.30225 14.0848L11.0319 17.7358C11.3799 18.0764 11.942 18.0764 12.29 17.7358L21.739 8.4947C22.087 8.15405 22.087 7.60378 21.739 7.26314H21.7301C21.391 6.91376 20.8289 6.91376 20.4809 7.2544ZM2.26099 14.0935L5.99063 17.7445C6.33861 18.0852 6.90074 18.0852 7.24872 17.7445L7.8733 17.1331L3.51907 12.8532C3.17109 12.5126 2.60897 12.5126 2.26099 12.8532C1.913 13.1939 1.913 13.7529 2.26099 14.0935Z" />
                </svg>
            );
        }
        case 'add': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" />
                </svg>
            );
        }
        case 'notifications': {
            return (
                <svg width={size} height={size} viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.00005 20C9.10005 20 10.0001 19.1 10.0001 18H6.00005C6.00005 19.1 6.89005 20 8.00005 20ZM14.0001 14V9C14.0001 5.93 12.3601 3.36 9.50005 2.68V2C9.50005 1.17 8.83005 0.5 8.00005 0.5C7.17005 0.5 6.50005 1.17 6.50005 2V2.68C3.63005 3.36 2.00005 5.92 2.00005 9V14L0.710051 15.29C0.0800515 15.92 0.520051 17 1.41005 17H14.5801C15.4701 17 15.9201 15.92 15.2901 15.29L14.0001 14Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'notifications-off': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.0001 22C13.1001 22 14.0001 21.1 14.0001 20H10.0001C10.0001 21.1 10.8901 22 12.0001 22ZM18.0001 16V11C18.0001 7.93 16.3601 5.36 13.5001 4.68V4C13.5001 3.17 12.8301 2.5 12.0001 2.5C11.1701 2.5 10.5001 3.17 10.5001 4V4.68C7.63005 5.36 6.00005 7.92 6.00005 11V16L4.71005 17.29C4.08005 17.92 4.52005 19 5.41005 19H18.5801C19.4701 19 19.9201 17.92 19.2901 17.29L18.0001 16Z"
                        fill="#2A313C"
                    />
                    <path d="M5.5 5.5C13.5057 13.5057 11.4943 11.4943 19.5 19.5" stroke="#FF4B4B" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        }
        case 'more': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" />
                </svg>
            );
        }
        case 'logout': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="var(--text-primary)"
                        d="M5.1499 5H11.1499C11.6999 5 12.1499 4.55 12.1499 4C12.1499 3.45 11.6999 3 11.1499 3H5.1499C4.0499 3 3.1499 3.9 3.1499 5V19C3.1499 20.1 4.0499 21 5.1499 21H11.1499C11.6999 21 12.1499 20.55 12.1499 20C12.1499 19.45 11.6999 19 11.1499 19H5.1499V5Z"
                    />
                    <path
                        fill="var(--text-primary)"
                        d="M20.7999 11.65L18.0099 8.86C17.6899 8.54 17.1499 8.76 17.1499 9.21V11H10.1499C9.5999 11 9.1499 11.45 9.1499 12C9.1499 12.55 9.5999 13 10.1499 13H17.1499V14.79C17.1499 15.24 17.6899 15.46 17.9999 15.14L20.7899 12.35C20.9899 12.16 20.9899 11.84 20.7999 11.65Z"
                    />
                </svg>
            );
        }
        case 'delete': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM9 9H15C15.55 9 16 9.45 16 10V18C16 18.55 15.55 19 15 19H9C8.45 19 8 18.55 8 18V10C8 9.45 8.45 9 9 9ZM15.5 4L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4H15.5Z" />
                </svg>
            );
        }
        case 'settings': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4999 12C19.4999 11.77 19.4899 11.55 19.4699 11.32L21.3299 9.91C21.7299 9.61 21.8399 9.05 21.5899 8.61L19.7199 5.38C19.4699 4.94 18.9299 4.76 18.4699 4.96L16.3199 5.87C15.9499 5.61 15.5599 5.38 15.1499 5.19L14.8599 2.88C14.7999 2.38 14.3699 2 13.8699 2H10.1399C9.62991 2 9.19991 2.38 9.13991 2.88L8.84991 5.19C8.43991 5.38 8.04991 5.61 7.67991 5.87L5.52991 4.96C5.06991 4.76 4.52991 4.94 4.27991 5.38L2.40991 8.62C2.15991 9.06 2.26991 9.61 2.66991 9.92L4.52991 11.33C4.50991 11.55 4.49991 11.77 4.49991 12C4.49991 12.23 4.50991 12.45 4.52991 12.68L2.66991 14.09C2.26991 14.39 2.15991 14.95 2.40991 15.39L4.27991 18.62C4.52991 19.06 5.06991 19.24 5.52991 19.04L7.67991 18.13C8.04991 18.39 8.43991 18.62 8.84991 18.81L9.13991 21.12C9.19991 21.62 9.62991 22 10.1299 22H13.8599C14.3599 22 14.7899 21.62 14.8499 21.12L15.1399 18.81C15.5499 18.62 15.9399 18.39 16.3099 18.13L18.4599 19.04C18.9199 19.24 19.4599 19.06 19.7099 18.62L21.5799 15.39C21.8299 14.95 21.7199 14.4 21.3199 14.09L19.4599 12.68C19.4899 12.45 19.4999 12.23 19.4999 12ZM12.0399 15.5C10.1099 15.5 8.53991 13.93 8.53991 12C8.53991 10.07 10.1099 8.5 12.0399 8.5C13.9699 8.5 15.5399 10.07 15.5399 12C15.5399 13.93 13.9699 15.5 12.0399 15.5Z" />
                </svg>
            );
        }
        case 'arrow-drop-right': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 22L18 12L8 2L6.225 3.775L14.45 12L6.225 20.225L8 22Z" />
                </svg>
            );
        }
        case 'swap': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.14003 11.8603L3.36003 14.6503C3.17003 14.8503 3.17003 15.1603 3.36003 15.3603L6.14003 18.1503C6.45003 18.4703 6.99003 18.2403 6.99003 17.8003V16.0003H13C13.55 16.0003 14 15.5503 14 15.0003C14 14.4503 13.55 14.0003 13 14.0003H6.99003V12.2103C6.99003 11.7603 6.45003 11.5403 6.14003 11.8603ZM20.65 8.65033L17.87 5.86033C17.56 5.54033 17.02 5.77033 17.02 6.21033V8.00033H11C10.45 8.00033 10 8.45033 10 9.00033C10 9.55033 10.45 10.0003 11 10.0003H17.01V11.7903C17.01 12.2403 17.55 12.4603 17.86 12.1403L20.64 9.35033C20.84 9.16033 20.84 8.84033 20.65 8.65033Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'personal-acc': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V18C20 15.34 14.67 14 12 14Z" />
                </svg>
            );
        }
        case 'work-acc': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 16H11C10.45 16 10 15.55 10 15H3.01V19C3.01 20.1 3.91 21 5.01 21H19C20.1 21 21 20.1 21 19V15H14C14 15.55 13.55 16 13 16ZM20 7H16C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7H4C2.9 7 2 7.9 2 9V12C2 13.11 2.89 14 4 14H10V13C10 12.45 10.45 12 11 12H13C13.55 12 14 12.45 14 13V14H20C21.1 14 22 13.1 22 12V9C22 7.9 21.1 7 20 7ZM10 7C10 5.9 10.9 5 12 5C13.1 5 14 5.9 14 7H9.99H10Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'chat': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3H4C2.9 3 2.01 3.9 2.01 5L2 23L6 19H20C21.1 19 22 18.1 22 17V5C22 3.9 21.1 3 20 3ZM7 10H17C17.55 10 18 10.45 18 11C18 11.55 17.55 12 17 12H7C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10ZM13 15H7C6.45 15 6 14.55 6 14C6 13.45 6.45 13 7 13H13C13.55 13 14 13.45 14 14C14 14.55 13.55 15 13 15ZM17 9H7C6.45 9 6 8.55 6 8C6 7.45 6.45 7 7 7H17C17.55 7 18 7.45 18 8C18 8.55 17.55 9 17 9Z" />
                </svg>
            );
        }
        case 'phone': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.23 15.2598L16.69 14.9698C16.08 14.8998 15.48 15.1098 15.05 15.5398L13.21 17.3798C10.38 15.9398 8.06004 13.6298 6.62004 10.7898L8.47004 8.93976C8.90004 8.50977 9.11004 7.90977 9.04004 7.29977L8.75004 4.77977C8.63004 3.76977 7.78004 3.00977 6.76004 3.00977H5.03004C3.90004 3.00977 2.96004 3.94977 3.03004 5.07977C3.56004 13.6198 10.39 20.4398 18.92 20.9698C20.05 21.0398 20.99 20.0998 20.99 18.9698V17.2398C21 16.2298 20.24 15.3798 19.23 15.2598Z" />
                </svg>
            );
        }
        case 'videocam-outlined': {
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5333 7.33333C14.9752 7.33333 15.3333 7.69151 15.3333 8.13333V15.8667C15.3333 16.3085 14.9752 16.6667 14.5333 16.6667H5.02222C4.58039 16.6667 4.22222 16.3085 4.22222 15.8667V8.13333C4.22222 7.6915 4.58039 7.33333 5.02222 7.33333H14.5333ZM16.4444 5H3.11111C2.5 5 2 5.525 2 6.16667V17.8333C2 18.475 2.5 19 3.11111 19H16.4444C17.0556 19 17.5556 18.475 17.5556 17.8333V15.75C17.5556 15.0278 18.4368 14.6753 18.9349 15.1983L20.6207 16.9684C21.1187 17.4913 22 17.1388 22 16.4167V7.58333C22 6.86116 21.1187 6.50866 20.6207 7.03161L18.9349 8.80172C18.4368 9.32467 17.5556 8.97217 17.5556 8.25V6.16667C17.5556 5.525 17.0556 5 16.4444 5Z" />
                </svg>
            );
        }
        case 'videocam-pulse': {
            return (
                <div className={styles.pulse}>
                    <svg className={styles.pulse} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5333 7.33333C14.9752 7.33333 15.3333 7.69151 15.3333 8.13333V15.8667C15.3333 16.3085 14.9752 16.6667 14.5333 16.6667H5.02222C4.58039 16.6667 4.22222 16.3085 4.22222 15.8667V8.13333C4.22222 7.6915 4.58039 7.33333 5.02222 7.33333H14.5333ZM16.4444 5H3.11111C2.5 5 2 5.525 2 6.16667V17.8333C2 18.475 2.5 19 3.11111 19H16.4444C17.0556 19 17.5556 18.475 17.5556 17.8333V15.75C17.5556 15.0278 18.4368 14.6753 18.9349 15.1983L20.6207 16.9684C21.1187 17.4913 22 17.1388 22 16.4167V7.58333C22 6.86116 21.1187 6.50866 20.6207 7.03161L18.9349 8.80172C18.4368 9.32467 17.5556 8.97217 17.5556 8.25V6.16667C17.5556 5.525 17.0556 5 16.4444 5Z" />
                    </svg>
                </div>
            );
        }
        case 'videocam': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L19.29 15.79C19.92 16.42 21 15.97 21 15.08V8.91C21 8.02 19.92 7.57 19.29 8.2L17 10.5Z" />
                </svg>
            );
        }
        case 'block': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'volume-off': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.53253 7.33998C6.20287 7.03302 6.20287 6.53717 6.53253 6.23022C6.87065 5.92326 7.40318 5.92326 7.73285 6.23022L10.8234 9.10974L12.1622 7.86731C12.6947 7.37146 13.6076 7.71777 13.6076 8.41826V11.7039L17.7474 15.5628C18.077 15.8697 18.0877 16.3755 17.758 16.6824C17.4283 16.9894 16.8958 16.9894 16.5662 16.6824L13.6076 13.9277L9.6263 10.2206L6.53253 7.33998ZM8.53588 10.4468L6.84529 10.4568C6.38038 10.4568 6 10.8109 6 11.2438V14.3921C6 14.825 6.38038 15.1791 6.84529 15.1791H9.38117L12.1622 17.7686C12.6947 18.2644 13.6076 17.9103 13.6076 17.2098V15.1692L8.53588 10.4468Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'add-photo': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19 8V6H17V4H19V2H21V4H23V6H21V8H19ZM3 22C2.45 22 1.97917 21.8042 1.5875 21.4125C1.19583 21.0208 1 20.55 1 20V8C1 7.45 1.19583 6.97917 1.5875 6.5875C1.97917 6.19583 2.45 6 3 6H6.15L8 4H14V6H8.875L7.05 8H3V20H19V11H21V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H3ZM11 18.5C12.25 18.5 13.3125 18.0625 14.1875 17.1875C15.0625 16.3125 15.5 15.25 15.5 14C15.5 12.75 15.0625 11.6875 14.1875 10.8125C13.3125 9.9375 12.25 9.5 11 9.5C9.75 9.5 8.6875 9.9375 7.8125 10.8125C6.9375 11.6875 6.5 12.75 6.5 14C6.5 15.25 6.9375 16.3125 7.8125 17.1875C8.6875 18.0625 9.75 18.5 11 18.5ZM11 16.5C10.3 16.5 9.70833 16.2583 9.225 15.775C8.74167 15.2917 8.5 14.7 8.5 14C8.5 13.3 8.74167 12.7083 9.225 12.225C9.70833 11.7417 10.3 11.5 11 11.5C11.7 11.5 12.2917 11.7417 12.775 12.225C13.2583 12.7083 13.5 13.3 13.5 14C13.5 14.7 13.2583 15.2917 12.775 15.775C12.2917 16.2583 11.7 16.5 11 16.5Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'add-image': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H14V5H5V19H19V10H21V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM17 9V7H15V5H17V3H19V5H21V7H19V9H17ZM6 17H18L14.25 12L11.25 16L9 13L6 17Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'gallery': {
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M38 34.8889V13.1111C38 11.4 36.6 10 34.8889 10H13.1111C11.4 10 10 11.4 10 13.1111V34.8889C10 36.6 11.4 38 13.1111 38H34.8889C36.6 38 38 36.6 38 34.8889ZM19.1778 27.08L22.4444 31.0156L27.2667 24.8089C27.5778 24.4044 28.2 24.4044 28.5111 24.8244L33.9711 32.1044C34.36 32.6178 33.9867 33.3489 33.3489 33.3489H14.6978C14.0444 33.3489 13.6867 32.6022 14.0911 32.0889L17.9644 27.1111C18.26 26.7067 18.8511 26.6911 19.1778 27.08Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'camera': {
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 29.5C26.4853 29.5 28.5 27.4853 28.5 25C28.5 22.5147 26.4853 20.5 24 20.5C21.5147 20.5 19.5 22.5147 19.5 25C19.5 27.4853 21.5147 29.5 24 29.5Z"
                        fill="#2A313C"
                    />
                    <path
                        d="M36 13H31.245L29.385 10.975C28.83 10.36 28.02 10 27.18 10H20.82C19.98 10 19.17 10.36 18.6 10.975L16.755 13H12C10.35 13 9 14.35 9 16V34C9 35.65 10.35 37 12 37H36C37.65 37 39 35.65 39 34V16C39 14.35 37.65 13 36 13ZM24 32.5C19.86 32.5 16.5 29.14 16.5 25C16.5 20.86 19.86 17.5 24 17.5C28.14 17.5 31.5 20.86 31.5 25C31.5 29.14 28.14 32.5 24 32.5Z"
                        fill="#2A313C"
                    />
                </svg>
            );
        }
        case 'email': {
            return (
                <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35.2 12.7998H12.8C11.26 12.7998 10.014 14.0598 10.014 15.5998L10 32.3998C10 33.9398 11.26 35.1998 12.8 35.1998H35.2C36.74 35.1998 38 33.9398 38 32.3998V15.5998C38 14.0598 36.74 12.7998 35.2 12.7998ZM34.64 18.7498L24.742 24.9378C24.294 25.2178 23.706 25.2178 23.258 24.9378L13.36 18.7498C13.01 18.5258 12.8 18.1478 12.8 17.7418C12.8 16.8038 13.822 16.2438 14.62 16.7338L24 22.5998L33.38 16.7338C34.178 16.2438 35.2 16.8038 35.2 17.7418C35.2 18.1478 34.99 18.5258 34.64 18.7498Z" />
                </svg>
            );
        }
        case 'contacts': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7428 9.51888C13.6875 9.43172 13.6914 9.32184 13.7418 9.23184C14.1561 8.49669 14.3913 7.64782 14.3913 6.74119C14.3913 6.42666 14.3637 6.11969 14.3084 5.81937C14.2903 5.72085 14.3208 5.61853 14.398 5.55316C14.9265 5.10695 15.6104 4.84645 16.3437 4.84645C18.3598 4.84645 19.9311 6.78946 19.2645 8.87461C18.975 9.77935 18.2321 10.5136 17.3208 10.7969C15.8456 11.2554 14.4437 10.6273 13.7428 9.51888ZM17.8188 12.2179H15.9313C15.678 12.2179 15.5474 12.5239 15.7312 12.6982C17.0836 13.979 17.715 15.8255 17.715 17.6558V18.7736C17.715 18.9309 17.8426 19.0579 18.0007 19.0579H21.5243C21.7872 19.0579 22.0005 18.8457 22.0005 18.5842V16.3864C21.9995 14.4632 20.9044 12.2179 17.8188 12.2179ZM9.15162 10.5316C11.2525 10.5316 12.961 8.83201 12.961 6.74211C12.961 4.65222 11.2525 2.95264 9.15162 2.95264C7.05076 2.95264 5.34227 4.65222 5.34227 6.74211C5.34227 8.83201 7.05076 10.5316 9.15162 10.5316ZM11.0477 12.4263H7.23834C3.37185 12.4263 2.00049 15.2429 2.00049 17.6549V20.479C2.00049 20.7404 2.21381 20.9526 2.47666 20.9526H15.8094C16.0722 20.9526 16.2855 20.7404 16.2855 20.479V17.6549C16.2855 15.2429 14.9142 12.4263 11.0477 12.4263Z" />
                </svg>
            );
        }
        case 'messages': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C10.1074 2.00016 8.25373 2.53734 6.65431 3.54913C5.05488 4.56092 3.77539 6.00578 2.96449 7.71584C2.15359 9.42591 1.84457 11.331 2.07333 13.2097C2.3021 15.0884 3.05926 16.8636 4.25684 18.3291L2.293 20.293C2.15315 20.4328 2.0579 20.611 2.01931 20.805C1.98072 20.9989 2.00051 21.2 2.07619 21.3827C2.15187 21.5654 2.28003 21.7216 2.44447 21.8315C2.60891 21.9414 2.80223 22 3 22H12C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM9 7H15C15.2652 7 15.5196 7.10536 15.7071 7.29289C15.8946 7.48043 16 7.73478 16 8C16 8.26522 15.8946 8.51957 15.7071 8.70711C15.5196 8.89464 15.2652 9 15 9H9C8.73479 9 8.48043 8.89464 8.2929 8.70711C8.10536 8.51957 8 8.26522 8 8C8 7.73478 8.10536 7.48043 8.2929 7.29289C8.48043 7.10536 8.73479 7 9 7ZM15 17H9C8.73479 17 8.48043 16.8946 8.2929 16.7071C8.10536 16.5196 8 16.2652 8 16C8 15.7348 8.10536 15.4804 8.2929 15.2929C8.48043 15.1054 8.73479 15 9 15H15C15.2652 15 15.5196 15.1054 15.7071 15.2929C15.8946 15.4804 16 15.7348 16 16C16 16.2652 15.8946 16.5196 15.7071 16.7071C15.5196 16.8946 15.2652 17 15 17ZM17 13H7C6.73479 13 6.48043 12.8946 6.2929 12.7071C6.10536 12.5196 6 12.2652 6 12C6 11.7348 6.10536 11.4804 6.2929 11.2929C6.48043 11.1054 6.73479 11 7 11H17C17.2652 11 17.5196 11.1054 17.7071 11.2929C17.8946 11.4804 18 11.7348 18 12C18 12.2652 17.8946 12.5196 17.7071 12.7071C17.5196 12.8946 17.2652 13 17 13Z" />
                </svg>
            );
        }
        case 'tasks': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 15.5V17C17 17.6 16.6 18 16 18C15.4 18 15 17.6 15 17V15.5H9V17C9 17.6 8.6 18 8 18C7.4 18 7 17.6 7 17V15.5H5C4.3 15.5 3.6 15.3 3 15V19C3 20.7 4.3 22 6 22H18C19.7 22 21 20.7 21 19V15C20.4 15.3 19.7 15.5 19 15.5H17ZM21 6H17V5C17 3.3 15.7 2 14 2H10C8.3 2 7 3.3 7 5V6H3C2.4 6 2 6.4 2 7V11C2 12.7 3.3 14 5 14H19C20.7 14 22 12.7 22 11V7C22 6.4 21.6 6 21 6ZM15 6H9V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V6Z" />
                </svg>
            );
        }
        case 'profile': {
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM15.0207 8.81395C15.0207 7.15658 13.6695 5.8125 12.002 5.8125C10.3353 5.8125 8.98407 7.15658 8.98407 8.81395C8.98407 10.4717 10.3353 11.8154 12.002 11.8154C13.6695 11.8154 15.0207 10.4717 15.0207 8.81395ZM7.63885 17.2758C8.81371 18.2727 10.3369 18.875 12 18.875C13.6635 18.875 15.1871 18.2727 16.3616 17.2754C16.6482 17.0327 16.8125 16.6775 16.8125 16.3036C16.8125 14.6227 15.4496 13.2775 13.7585 13.2775H10.2463C8.55557 13.2775 7.1875 14.6227 7.1875 16.3036C7.1875 16.6771 7.35265 17.0331 7.63885 17.2758Z"
                    />
                </svg>
            );
        }

        default:
            return null;
    }
}

export default BaseIcons;
