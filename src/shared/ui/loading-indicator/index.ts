import { ForwardRefExoticComponent } from 'react';

import * as Types from './types';
import Glare from './ui/glare';
import Spinner from './ui/spinner';

type CompoundedComponent = ForwardRefExoticComponent<Types.SpinnerProps> & {
    Glare: typeof Glare;
};

const LoadingIndicator = Spinner as CompoundedComponent;

LoadingIndicator.Glare = Glare;

export { Types };
export default LoadingIndicator;
