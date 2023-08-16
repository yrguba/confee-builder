import { useState, useEffect } from 'react';

type Props = {
    onAfterSaving?: (file: FormData) => void;
};

const initialState = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
};

export default function useAudioRecorder({ onAfterSaving }: Props) {
    const [recorderState, setRecorderState] = useState(initialState);
    const [formData, setFormData] = useState<FormData | null>(null);
    useEffect(() => {
        const MAX_RECORDER_TIME = 5;
        let recordingInterval: any = null;

        if (recorderState.initRecording)
            recordingInterval = setInterval(() => {
                setRecorderState((prevState: any) => {
                    if (prevState.recordingMinutes === MAX_RECORDER_TIME && prevState.recordingSeconds === 0) {
                        clearInterval(recordingInterval);
                        return prevState;
                    }

                    if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
                        return {
                            ...prevState,
                            recordingSeconds: prevState.recordingSeconds + 1,
                        };

                    if (prevState.recordingSeconds === 59)
                        return {
                            ...prevState,
                            recordingMinutes: prevState.recordingMinutes + 1,
                            recordingSeconds: 0,
                        };
                });
            }, 1000);
        else clearInterval(recordingInterval);

        return () => clearInterval(recordingInterval);
    });

    useEffect(() => {
        if (recorderState.mediaStream)
            setRecorderState((prevState: any) => {
                return {
                    ...prevState,
                    mediaRecorder: new MediaRecorder(prevState.mediaStream),
                };
            });
    }, [recorderState.mediaStream]);

    useEffect(() => {
        const recorder: any = recorderState.mediaRecorder;
        let chunks: any = [];

        if (recorder && recorder.state === 'inactive') {
            recorder.start();

            recorder.ondataavailable = (e: any) => {
                chunks.push(e.data);
            };

            recorder.onstop = (data: any) => {
                const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
                const file = new File(chunks, `${new Date().valueOf()}.wav`);
                const formData = new FormData();
                formData.append('files[audios][]', file);
                setFormData(formData);
                chunks = [];

                // @ts-ignore
                setRecorderState((prevState: any) => {
                    if (prevState.mediaRecorder) {
                        onAfterSaving && onAfterSaving(formData);
                        return {
                            ...initialState,
                            // file,
                            audio: window.URL.createObjectURL(blob),
                        };
                    }
                    return initialState;
                });
            };
        }

        return () => {
            if (recorder) recorder.stream.getAudioTracks().forEach((track: any) => track.stop());
        };
    }, [recorderState.mediaRecorder]);

    return {
        recorderState,
        startRecording: () => startRecording(setRecorderState),
        cancelRecording: () => setRecorderState(initialState),
        saveRecording: () => {
            saveRecording(recorderState.mediaRecorder);
            return { recorderState, formData };
        },
    };
}

async function startRecording(setRecorderState: any) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        setRecorderState((prevState: any) => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            };
        });
    } catch (err) {
        console.log(err);
    }
}

function saveRecording(recorder: any) {
    if (recorder.state !== 'inactive') recorder.stop();
}
