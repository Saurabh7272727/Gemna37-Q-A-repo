importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");


// const apikey = import.meta.env.VITE_APP_FIREBASE_API_KEY;

firebase.initializeApp({
    apiKey: 'AIzaSyD7HhIbYfXjEsXa-tXhZmLCEDRNTD8tu4o',
    authDomain: "gemna-notification.firebaseapp.com",
    projectId: "gemna-notification",
    messagingSenderId: "207734462937",
    appId: "1:207734462937:web:e673ad61ff98b3991561c8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body
    });
});