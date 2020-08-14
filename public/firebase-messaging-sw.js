importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js'); // eslint-disable-line
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');
const firebaseConfig = {
    apiKey: "AIzaSyAMowVTjmpmI4KFDkCsh09o1AX4lZfFnkw",
    authDomain: "sellermobilenative.firebaseapp.com",
    databaseURL: "https://sellermobilenative.firebaseio.com",
    projectId: "sellermobilenative",
    storageBucket: "sellermobilenative.appspot.com",
    messagingSenderId: "743132307687",
    appId: "1:743132307687:web:11493a45e87a2189d28242"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon
    };
    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

