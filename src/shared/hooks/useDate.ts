import moment from 'moment';

type Options = {
    format: 'LT';
};

function useDate(date: Date, options?: Options) {
    return moment(date).format(options?.format || 'LT');
}

export default useDate;
