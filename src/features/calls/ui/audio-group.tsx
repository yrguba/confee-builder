import React from 'react';

import { GroupAudioCallView } from 'entities/calls';
import { useEasyState } from 'shared/hooks';

const peerConnection = new RTCPeerConnection();
const dataChannel = peerConnection.createDataChannel('test');

function GroupAudioCall() {
    const callStartedState = useEasyState(false);
    const microphoneState = useEasyState(false);
    dataChannel.onopen = () => {
        console.log('open');
    };
    dataChannel.onmessage = (e) => {
        console.log('onmessage', e);
    };

    peerConnection.onicecandidate = (e) => {
        console.log('onicecandidate', peerConnection.localDescription);
    };

    peerConnection.createOffer().then((res) => {
        peerConnection.setLocalDescription(res);
    });
    return <GroupAudioCallView callStartedState={callStartedState} microphoneState={microphoneState} />;
}

export default GroupAudioCall;
