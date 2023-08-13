import { ConfigMediaQuery } from 'react-screen-hooks';

const mediaQuery = ConfigMediaQuery({
    widthBreakpoints: {
        sm: 680,
        md: 800,
        lg: 1024,
        xl: 1400,
    },
    heightBreakpoints: {
        sm: 680,
        md: 800,
        lg: 1024,
        xl: 1400,
    },
});

export default mediaQuery;
