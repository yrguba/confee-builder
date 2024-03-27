import React from 'react';
import ReactDOM from 'react-dom';

import { PhotoVideoSwiper } from 'features/app';

import styles from './styles.module.scss';

function MeetPage() {
    const calls_root = document.querySelector('#swiper-root');

    return calls_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                  <PhotoVideoSwiper />
              </div>,
              calls_root
          )
        : null;
}

export default MeetPage;
