import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeech, useMount } from 'react-use';

import useRouter from './useRouter';

const voices = window.speechSynthesis.getVoices();
function useVoiceAssistant() {
    // const { navigate } = useRouter();
    // const commands = [
    //     {
    //         command: 'сообщени*',
    //         callback: () => navigate('/chats/personal'),
    //     },
    //     {
    //         command: 'контакты*',
    //         callback: () => navigate('/contacts'),
    //     },
    //     {
    //         command: 'задачи*',
    //         callback: () => navigate('/tasks'),
    //     },
    //     {
    //         command: 'профиль*',
    //         callback: () => navigate('/profile'),
    //     },
    //     {
    //         command: 'настройки*',
    //         callback: () => navigate('/profile/settings'),
    //     },
    //     {
    //         command: 'все*',
    //         callback: () => navigate('/chats/all'),
    //     },
    //     {
    //         command: ['личные*', 'личная*', 'личное*'],
    //         callback: () => navigate('/chats/personal'),
    //     },
    //     {
    //         command: 'тфн*',
    //         callback: () => navigate('/chats/company/17'),
    //     },
    // ];
    // const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });
    // console.log(transcript);
    // useMount(() => SpeechRecognition.startListening({ language: 'ru-Ru', continuous: true }));
}

export default useVoiceAssistant;
