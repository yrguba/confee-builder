import axios from 'axios';
import Base64url from 'crypto-js/enc-base64url';
import SHA256 from 'crypto-js/sha256';
import { useLocation } from 'react-router-dom';

import { appService } from 'entities/app';

import { viewerStore } from '../../../entities/viewer';
import { debounce } from '../../../shared/lib';

const authorizeEndpoint = 'oauth/authorize';
const tokenEndpoint = 'oauth/token';

const codeVerifier = 'mYCO3rcUzhc6RkTKbwurKhDHIIHuc0ojKj2bH9xnOK0fUeSRwki8fSmLDj9goRtRytKrP4W0UD7j4wIeYHHizRrGuEWvkHwHdSR35eTNCATg4EkC42U93cDO7j6NFTz6';
const getTokens = debounce((cb) => cb(), 1000);
const webView = () => {
    const { pathname } = useLocation();

    const { clientBaseURL, backBaseURL } = appService.getUrls();
    const deviceId = appService.getDeviceId();

    const { prodApi } = appService;

    const getClientId = () => {
        if (clientBaseURL.includes('https://messenger.confee.ru')) {
            // web
            if (prodApi) return '9';
            return '15';
        }
        if (clientBaseURL.includes('localhost')) {
            if (clientBaseURL.includes('tauri')) {
                // win
                if (clientBaseURL.includes('https')) {
                    if (prodApi) return '10';
                    return '9';
                }
                // mac
                if (prodApi) return '12';
                return '10';
            }
            if (prodApi) return '8';
            return '7';
        }
        // if (clientBaseURL.includes('api.dev')) return '6';
    };

    const redirectUri = `${clientBaseURL}/callback`;
    const clientId = getClientId();
    const hashed = SHA256(codeVerifier);
    const params = {
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: '',
        state: 'state',
        code_challenge: Base64url.stringify(hashed),
        code_challenge_method: 'S256',
        prompt: 'login',
    };
    const buildParams = Object.entries(params).reduce((acc, [key, val]) => `${acc}${acc && '&'}${key}=${val}`, '');

    if (pathname === '/callback') {
        const { search } = window.location;
        const code = new URLSearchParams(search).get('code');

        const getSecret = () => {
            if (clientId === '8') return 'pywgm57UX3lhtWemksJdHKXPZbjMa59Tqyoiw40G';
            if (clientId === '9') return 'qlkWrd3VFnV05fU2m3Mqp4u7Us6FP11z04svMuf2';
            if (clientId === '10') return 'dHQ7O54KVBynKEFVo1F5OofUDJRosDY2gqapssFB';
            if (clientId === '12') return 'Qn9p0NP1GVp2aFTRKB1PiXaiRYrHcGT826YqGhGR';
        };

        const body = {
            grant_type: 'authorization_code',
            client_id: clientId,
            code_verifier: codeVerifier,
            redirect_uri: redirectUri,
            code,
            client_secret: getSecret(),
        };

        getTokens(async () => {
            const deviceName = (await appService.getDeviceName()) as any;
            const encDeviceName = encodeURI(deviceName || 'unknown');
            try {
                axios.post(`${backBaseURL}/${tokenEndpoint}`, body).then((res: any) => {
                    if (res.data.access_token) {
                        viewerStore.setStateOutsideComponent({ tokens: { access_token: res.data.access_token, refresh_token: res.data.refresh_token } });
                        // window.location.reload();
                    } else {
                        window.location.href = `${backBaseURL}/${authorizeEndpoint}?${buildParams}`;
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });
    } else {
        window.location.href = `${backBaseURL}/${authorizeEndpoint}?${buildParams}`;
    }

    return null;
};

export default webView;
