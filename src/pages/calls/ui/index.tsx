import React from 'react';
import ReactDOM from 'react-dom';

import AudioPrivate from 'features/calls/ui/audio-private';

import styles from './styles.module.scss';

function CallsPage() {
    const calls_root = document.querySelector('#calls-root');

    return calls_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
                  <AudioPrivate />
              </div>,
              calls_root
          )
        : null;
}

export default CallsPage;
