import { useAudio } from 'shared/hooks';

const pokemon = require('assets/ringtone/Impress.mp3');

function useRingtone() {
    const [audio, state, controls, ref] = useAudio({
        src: pokemon,
        autoPlay: true,
    });

    return { audio, controls, state };
}

export default useRingtone;
