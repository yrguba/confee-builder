import cn from 'classnames';
import cnBind from 'classnames/bind';

function useStyles(styles: any, baseClass: string, otherClasses = {}): string {
    return cn(cnBind.bind(styles)(baseClass, otherClasses));
}

export default useStyles;
