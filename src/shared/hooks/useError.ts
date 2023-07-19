import moment from 'moment/moment';
import { useState } from 'react';

function useError({ timeClear }: { timeClear: number }) {
    const [error, setError] = useState<string>('');
    return [error, setError];
}

export default useError;
