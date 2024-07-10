function useTextToSpeech() {
    const msg = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    const playSpeech = (text: string) => {
        // eslint-disable-next-line prefer-destructuring
        msg.voice = voices[1];
        msg.text = text;
        window.speechSynthesis.speak(msg);
    };

    return { playSpeech };
}
export default useTextToSpeech;
