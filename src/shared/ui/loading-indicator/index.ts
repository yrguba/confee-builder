import { ForwardRefExoticComponent } from 'react';

import * as LoadingIndicatorTypes from './types';
import Glare from './ui/glare';
import Spinner from './ui/spinner';

type CompoundedComponent = ForwardRefExoticComponent<LoadingIndicatorTypes.SpinnerProps> & {
    Glare: typeof Glare;
};

const LoadingIndicator = Spinner as CompoundedComponent;

LoadingIndicator.Glare = Glare;

export { LoadingIndicatorTypes };
export default LoadingIndicator;
