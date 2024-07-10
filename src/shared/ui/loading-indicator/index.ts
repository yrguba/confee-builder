import { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Downloaded from './ui/download';
import Glare from './ui/glare';
import Spinner from './ui/spinner';

type CompoundedComponent = ForwardRefExoticComponent<Types.SpinnerProps> & {
    Glare: typeof Glare;
    Downloaded: typeof Downloaded;
};

const LoadingIndicator = Spinner as CompoundedComponent;

LoadingIndicator.Glare = Glare;
LoadingIndicator.Downloaded = Downloaded;

export { Types };
export default LoadingIndicator;
