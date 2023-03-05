import cn from 'classnames';
import cnBind from 'classnames/bind';

import styles from '../ui/dropdown/styles.module.scss';

function useStyles(baseClass: string, otherClasses = {}): string {
    return cn(cnBind.bind(styles)(baseClass, otherClasses));
}

export default useStyles;
