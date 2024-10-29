import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: "AIzaSyA5Y8Q9dPox7E9VouFdY6GDdasSwzo8Zv8",
  authDomain: "logintest-30ac7.firebaseapp.com",
  projectId: "logintest-30ac7",
  storageBucket: "logintest-30ac7.appspot.com",
  messagingSenderId: "86694838026",
  appId: "1:86694838026:web:b9f1cd652e8503368f84f3",
  measurementId: "G-J827Y1QEYR"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();
if (window.location.hostname === 'localhost') {
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
}

export { db, auth,firebase,storage };
