import { useAudio } from 'shared/hooks';

const pokemon = require('assets/ringtone/Impress.mp3');

type Props = {
    enabled?: boolean;
};

function useRingtone(props?: Props) {
    const [audio, state, controls, ref] = useAudio({
        src: pokemon,
        autoPlay: !!props?.enabled,
    });

    return { audio, controls, state };
}

export default useRingtone;
