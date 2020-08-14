import * as firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FCM_API_KEY,
    authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FCM_DATABASE_URL,
    projectId: process.env.REACT_APP_FCM_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FCM_APP_ID
}
const initializedFirebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = initializedFirebaseApp.messaging()
messaging.usePublicVapidKey(
    process.env.REACT_APP_FCM_PUBLIC_VAPID_KEY
)

export const requestNotification = () => {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.')
            getInitialToken()
        } else {
            console.log('Unable to get permission to notify.')
            setTokenSentToServer(false)
        }
    });
};

const getInitialToken = () => {
    messaging.getToken().then((currentToken) => {
        if (currentToken) {
            sendTokenToServer(currentToken)
        } else {
            console.log('No Instance ID token available. Request permission to generate one.')
            setTokenSentToServer(false)
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
        setTokenSentToServer(false)
    });
}

messaging.onMessage((payload) => {
    const { notification } = payload
    alert(notification.title + "\n" + notification.body + "\n" + notification.click_action)
});

messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.')
        setTokenSentToServer(false)
        sendTokenToServer(refreshedToken)
    }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err)
    });
});

const sendTokenToServer = (currentToken) => {
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...')
        // sendCurrentTokenToAPI(currentToken)
        setTokenSentToServer(true, currentToken)
    } else {
        console.log('Token already sent to server so will not send it again unless it changes')
    }
}

const isTokenSentToServer = () => {
    return window.localStorage.getItem('sentToServer') === '1'
}

const setTokenSentToServer = (sent, token = null) => {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0')
    window.localStorage.setItem('notif', token)
}