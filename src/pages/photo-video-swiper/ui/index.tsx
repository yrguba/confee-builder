import React from 'react';
import ReactDOM from 'react-dom';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

function MeetPage() {
    const calls_root = document.querySelector('#swiper-root');

    return calls_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                  swiper
              </div>,
              calls_root
          )
        : null;
}

export default MeetPage;
