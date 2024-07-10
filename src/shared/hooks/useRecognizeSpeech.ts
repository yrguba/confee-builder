import useSpeechToText from 'react-hook-speech-to-text';

const voices = window.speechSynthesis.getVoices();
function useRecognizeSpeech() {
    return useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });
}

export default useRecognizeSpeech;
