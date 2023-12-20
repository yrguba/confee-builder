import React from 'react';
import ReactDOM from 'react-dom';

import { Meet } from 'features/meet';

import styles from './styles.module.scss';

function MeetPage() {
    const calls_root = document.querySelector('#calls-root');

    return calls_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                  <Meet />
              </div>,
              calls_root
          )
        : null;
}

export default MeetPage;
