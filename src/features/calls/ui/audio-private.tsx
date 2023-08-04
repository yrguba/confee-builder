import React from 'react';

import { PrivateAudioCallView } from 'entities/calls';
import { useEasyState, useRouter, useWebRTC } from 'shared/hooks';

function PrivateAudioCall() {
    const { params } = useRouter();
    const { clients, provideMediaRef } = useWebRTC(params.chat_id);
    console.log(params.room_id);
    console.log(clients);
    return (
        <div>
            {clients.map((clientId) => (
                <div key={clientId}>
                    <video
                        ref={(instance) => {
                            provideMediaRef(clientId, instance);
                        }}
                        autoPlay
                        playsInline
                        muted={clientId === 'local'}
                    />
                </div>
            ))}
        </div>
    );
}

export default PrivateAudioCall;
