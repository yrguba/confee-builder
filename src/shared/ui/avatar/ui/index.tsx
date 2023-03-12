import React from 'react';

import styles from './styles.module.scss';
import { Props } from '../types';

function Avatar(props: Props) {
    const { size = 20, name, img, circle = true } = props;

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
    ];

    const getColor = () => {
        if (name) {
            const found = colors.find((i) => i.triggers.includes(name[0].toLowerCase()));
            if (found) return { color1: found.color1, color2: found.color2 };
        }
        return { color1: '#9575CD', color2: '#7986CB' };
    };

    const defaultIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <g data-name="user people person users man">
                <path d="M23.74 16.18a1 1 0 10-1.41 1.42A9 9 0 0125 24c0 1.22-3.51 3-9 3s-9-1.78-9-3a9 9 0 012.63-6.37 1 1 0 000-1.41 1 1 0 00-1.41 0A10.92 10.92 0 005 24c0 3.25 5.67 5 11 5s11-1.75 11-5a10.94 10.94 0 00-3.26-7.82z" />
                <path d="M16 17a7 7 0 10-7-7 7 7 0 007 7zm0-12a5 5 0 11-5 5 5 5 0 015-5z" />
            </g>
        </svg>
    );

    const getPreview = () => {
        if (name) {
            const splitName = name.split(' ');
            if (splitName.length > 1) return `${splitName[0][0]}${splitName[1][0]}`;
            return name[0];
        }
        return defaultIcon;
    };

    const color = getColor();
    const preview = getPreview();

    return (
        <div
            className={styles.avatar}
            style={{
                borderRadius: circle ? '50%' : 8,
                width: size,
                height: size,
                fontSize: size - size / 2,
                background: `linear-gradient(70.91deg, ${color.color1} 0%, ${color.color2} 100%)`,
            }}
        >
            {img ? <div className={styles.avatarBc} style={{ borderRadius: circle ? '50%' : 8, backgroundImage: `url(${img})` }} /> : preview}
        </div>
    );
}

export default Avatar;
