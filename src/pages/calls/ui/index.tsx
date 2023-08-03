import React from 'react';
import ReactDOM from 'react-dom';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

function CallsPage() {
    const calls_root = document.querySelector('#calls-root');

    return calls_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                  <Outlet />
              </div>,
              calls_root
          )
        : null;
}

export default CallsPage;
