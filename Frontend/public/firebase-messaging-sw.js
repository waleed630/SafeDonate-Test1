// Firebase Cloud Messaging service worker.
// Replace the config below with your project's config from Firebase Console.
// The main app uses VITE_FIREBASE_* env vars; ensure they match this config.
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification?.title || 'SafeDonate';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.ico',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
