import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAAUDfYtE06PRws8Gaa6p3L5P25y1w9ueg',
  authDomain: 'create-post-app-f6427.firebaseapp.com',
  projectId: 'create-post-app-f6427',
  storageBucket: 'create-post-app-f6427.appspot.com',
  messagingSenderId: '970165109912',
  appId: '1:970165109912:web:a65f05ae4c615e32df3ced',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
