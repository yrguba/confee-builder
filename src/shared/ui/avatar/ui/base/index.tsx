import React, { useCallback } from 'react';

import { companyTypes } from 'entities/company';
import { userTypes } from 'entities/user';
import { useFetchMediaContent } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import LoadingIndicator from '../../../loading-indicator';
import { BaseAvatarProps } from '../../types';

function Avatar(props: BaseAvatarProps) {
    const { photoIcon, size = 80, name, clickAvatar, img, circle = true, employeeStatuses, networkStatus, opacity = 1, loading } = props;

    const { src, error, isLoading } = useFetchMediaContent({ url: img || '', name: `${img}.jpg`, fileType: 'img' });

    const colors = [
        { id: 0, triggers: ['а', 'б', 'a', 'b'], color1: '#FF8A65', color2: '#EA5A5A' },
        { id: 1, triggers: ['в', 'г', 'c', 'd'], color1: '#FF8A65', color2: '#FFB74D' },
        { id: 2, triggers: ['д', 'е', 'e', 'f'], color1: '#F9CE37', color2: '#FFB74D' },
        { id: 3, triggers: ['ж', 'з', 'g', 'h'], color1: '#AED581', color2: '#DCE775' },
        { id: 4, triggers: ['и', 'к', 'i', 'j'], color1: '#81C784', color2: '#AED581' },
        { id: 5, triggers: ['л', 'м', 'k', 'l'], color1: '#4DB6AC', color2: '#81C784' },
        { id: 6, triggers: ['н', 'о', 'm', 'n'], color1: '#4DD0E1', color2: '#4DB6AC' },
        { id: 7, triggers: ['п', 'р', 'o', 'p'], color1: '#64B5F6', color2: '#4DD0E1' },
        { id: 8, triggers: ['с', 'т', 'q', 'r'], color1: '#7986CB', color2: '#64B5F6' },
        { id: 9, triggers: ['у', 'ф', 's', 't'], color1: '#9575CD', color2: '#7986CB' },
        { id: 10, triggers: ['х', 'ц', 'u', 'v'], color1: '#BA68C8', color2: '#9575CD' },
        { id: 11, triggers: ['ч', 'ш', 'w', 'x'], color1: '#F06292', color2: '#BA68C8' },
        { id: 12, triggers: ['э', 'ю', 'y', 'z'], color1: '#E57373', color2: '#F06292' },
        { id: 13, triggers: ['1', '2', '3', '4', '5', '6', 7, '8', '9', '10'], color1: '#E57373', color2: '#F06292' },
    ];

    const getColor = useCallback(() => {
        if (name) {
            const found = colors.find((i) => i.triggers.includes(name[0].toLowerCase()));
            if (found) return { color1: found.color1, color2: found.color2 };
        }
        return { color1: '#9575CD', color2: '#7986CB' };
    }, [name]);

    const defaultIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <g data-name="user people person users man">
                <path d="M23.74 16.18a1 1 0 10-1.41 1.42A9 9 0 0125 24c0 1.22-3.51 3-9 3s-9-1.78-9-3a9 9 0 012.63-6.37 1 1 0 000-1.41 1 1 0 00-1.41 0A10.92 10.92 0 005 24c0 3.25 5.67 5 11 5s11-1.75 11-5a10.94 10.94 0 00-3.26-7.82z" />
                <path d="M16 17a7 7 0 10-7-7 7 7 0 007 7zm0-12a5 5 0 11-5 5 5 5 0 015-5z" />
            </g>
        </svg>
    );

    const photoSvg = (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="40" fill="white" />
            <path
                d="M40 45.5C42.4853 45.5 44.5 43.4853 44.5 41C44.5 38.5147 42.4853 36.5 40 36.5C37.5147 36.5 35.5 38.5147 35.5 41C35.5 43.4853 37.5147 45.5 40 45.5Z"
                fill="#7B57C8"
            />
            <path
                d="M52 29H47.245L45.385 26.975C44.83 26.36 44.02 26 43.18 26H36.82C35.98 26 35.17 26.36 34.6 26.975L32.755 29H28C26.35 29 25 30.35 25 32V50C25 51.65 26.35 53 28 53H52C53.65 53 55 51.65 55 50V32C55 30.35 53.65 29 52 29ZM40 48.5C35.86 48.5 32.5 45.14 32.5 41C32.5 36.86 35.86 33.5 40 33.5C44.14 33.5 47.5 36.86 47.5 41C47.5 45.14 44.14 48.5 40 48.5Z"
                fill="#7B57C8"
            />
        </svg>
    );

    const getPreview = useCallback(() => {
        if (name) {
            const splitName = name.split(' ').filter((i) => !!i);
            if (splitName.length > 1) return `${splitName[0][0]}${splitName[1][0]}`;
            return name[0];
        }
        return photoIcon ? photoSvg : defaultIcon;
    }, [name]);

    const color = getColor();
    const preview = getPreview();

    return (
        <div
            className={styles.wrapper}
            onClick={clickAvatar}
            style={{
                opacity,
                borderRadius: circle ? '50%' : 8,
                width: size,
                minWidth: size,
                height: size,
                minHeight: size,
                fontSize: size - size / 2,
                background: isLoading || loading ? '' : !img || error ? `linear-gradient(70.91deg, ${color.color1} 0%, ${color.color2} 100%)` : '',
            }}
        >
            <Box.Animated
                visible={!!employeeStatuses || (!!networkStatus && networkStatus === 'online')}
                className={styles.status}
                style={{
                    backgroundColor: employeeStatuses
                        ? companyTypes.EmployeeStatuses[employeeStatuses]
                        : networkStatus
                        ? userTypes.NetworkStatuses[networkStatus]
                        : '',
                    width: size / 5,
                    height: size / 5,
                    right: size > 160 ? 29 : '',
                }}
            />

            {isLoading || loading ? (
                <div className={styles.loading}>
                    <LoadingIndicator visible />
                </div>
            ) : img && !error ? (
                <div className={styles.avatarBc} style={{ borderRadius: circle ? '50%' : 8, backgroundImage: `url(${src})` }} />
            ) : (
                preview
            )}
        </div>
    );
}

export default Avatar;
