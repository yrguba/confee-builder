export enum Paths {
    AUDIO_GROUP = '/calls/audio_group',
    AUDIO_PRIVATE = '/calls/audio_private',
    VIDEO_GROUP = '/calls/video_group',
    VIDEO_PRIVATE = '/calls/video_private',
}

export enum Actions {
    JOIN = 'join',
    LEAVE = 'leave',
    SHARE_ROOMS = 'share-rooms',
    ADD_PEER = 'add-peer',
    REMOVE_PEER = 'remove-peer',
    RELAY_SDP = 'relay-sdp',
    RELAY_ICE = 'relay-ice',
    ICE_CANDIDATE = 'ice-candidate',
    SESSION_DESCRIPTION = 'session-description',
}
