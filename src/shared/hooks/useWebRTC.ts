import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { callsTypes } from 'entities/calls';

import useEasyState from './useEasyState';
import useWebSocket from './useWebSocket';

function useWebRTC(roomId: string | undefined) {
    const clientsState = useEasyState<any[]>([]);
    const socket = useWebSocket();

    const peerConnections = useRef({});
    const localMediaStream: any = useRef(null);
    const peerMediaElements: any = useRef({});

    const addNewClient = useCallback(
        (newClient: any, callback: () => void) => {
            if (!clientsState.value.includes(newClient)) {
                clientsState.set((prev: any) => [...prev, newClient], callback);
            }
        },
        [clientsState.value, clientsState.set]
    );

    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });

            addNewClient('local', () => {
                const localVideoElement = peerMediaElements.current.local;

                if (localVideoElement) {
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        };

        startCapture()
            .then(() => socket.sendMessage(callsTypes.Actions.JOIN, { room: roomId }))
            .catch((e) => console.log('error', e));

        return () => {
            localMediaStream.current.getTracks().forEach((track: MediaStreamTrack) => track.stop());
            socket.sendMessage(callsTypes.Actions.LEAVE);
        };
    }, [roomId]);

    const provideMediaRef = useCallback((id: string, node: HTMLVideoElement | null) => {
        peerMediaElements.current[id] = node;
    }, []);

    return {
        clients: clientsState.value,
        provideMediaRef,
    };
}
export default useWebRTC;
