import React, { useRef } from 'react';

import { useSize, useGrid, useStyles } from 'shared/hooks';
import { Image, Document } from 'shared/ui';

import styles from './styles.module.scss';
import { ResponsiveMediaContentsProps } from '../types';

function ResponsiveMediaContents(props: ResponsiveMediaContentsProps) {
    const { type, list, imgSize = 200, gap, hardGrid } = props;

    const wrapperRef = useRef(null);

    const { width } = useSize(wrapperRef);

    const { column, row } = useGrid(width, list.length, imgSize);

    const getStyles = () => {
        if (hardGrid) {
            return { gap };
        }
        return { gap, gridTemplateColumns: `repeat(${column}, 1fr)`, gridTemplateRows: `repeat(${row}, 200px)` };
    };

    const classes = useStyles(styles, 'wrapper', {
        hardGrid,
        doc: type === 'documents',
    });

    return (
        <div ref={wrapperRef} style={getStyles()} className={classes}>
            {list.map((file, index) => (
                <>
                    {type === 'images' && (
                        <div key={index} className={styles.img} style={hardGrid ? { width: imgSize, height: imgSize } : {}}>
                            <Image key={index} img={file.url} />
                        </div>
                    )}
                    {type === 'documents' && <Document key={index} url={file.url} name={file.name} size={0} />}
                </>
            ))}
        </div>
    );
}

export default ResponsiveMediaContents;
