import axios from 'axios';
import Base64url from 'crypto-js/enc-base64url';
import SHA256 from 'crypto-js/sha256';
import { useLocation } from 'react-router-dom';

import { appService } from 'entities/app';
import { tokensService } from 'entities/viewer';

const authorizeEndpoint = 'oauth/authorize';
const tokenEndpoint = 'oauth/token';

const codeVerifier = 'mYCO3rcUzhc6RkTKbwurKhDHIIHuc0ojKj2bH9xnOK0fUeSRwki8fSmLDj9goRtRytKrP4W0UD7j4wIeYHHizRrGuEWvkHwHdSR35eTNCATg4EkC42U93cDO7j6NFTz6';

const webView = () => {
    const { pathname } = useLocation();

    const { clientBaseURL, backBaseURL } = appService.getUrls();
    const getClientId = () => {
        if (clientBaseURL.includes('localhost')) {
            if (clientBaseURL.includes('tauri')) {
                return '9';
            }
            return '7';
        }

        if (clientBaseURL.includes('api.dev')) return '6';
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

        const body = {
            grant_type: 'authorization_code',
            client_id: clientId,
            code_verifier: codeVerifier,
            redirect_uri: redirectUri,
            code,
        };

        axios.post(`${backBaseURL}/${tokenEndpoint}`, body).then((res) => {
            if (res.data.access_token) {
                tokensService.save({
                    access_token: res.data.access_token,
                    refresh_token: res.data.refresh_token,
                });
                window.location.reload();
            } else {
                window.location.href = `${backBaseURL}/${authorizeEndpoint}?${buildParams}`;
            }
        });
    } else {
        window.location.href = `${backBaseURL}/${authorizeEndpoint}?${buildParams}`;
    }

    return null;
};

export default webView;
