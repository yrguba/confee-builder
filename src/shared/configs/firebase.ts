import { Analytics, getAnalytics, setUserProperties, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDLbl7zjiUd-QRDDMImIprESpVV5129xA0',
    authDomain: 'hoolichat-a7077.firebaseapp.com',
    projectId: 'hoolichat-a7077',
    storageBucket: 'hoolichat-a7077.appspot.com',
    messagingSenderId: '272282963093',
    appId: '1:272282963093:web:55549c6a0f35e706089f9c',
    measurementId: 'G-GHT53NXBKZ',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics, logEvent };
