const pokemon = require('assets/ringtone/Impress.mp3');

function useRingtone() {
    const play = () => {
        const audio = new Audio(pokemon);
        const audioPromise = audio.play();
        if (audioPromise !== undefined) {
            audioPromise
                .then(() => {
                    // autoplay started
                    console.log('works');
                })
                .catch((err) => {
                    // catch dom exception
                    console.info(err);
                });
        }
    };
    return { play };
}

export default useRingtone;
