// utils/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBv5o9wisLho90U-2XgJSl7Z3PT7sSHfgE",
  authDomain: "endgame-team-project.firebaseapp.com",
  projectId: "endgame-team-project",
  storageBucket: "endgame-team-project.appspot.com",
  messagingSenderId: "49379562265",
  appId: "1:49379562265:web:b89b8fb280bcfa879d6b88"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
export {auth, app,storage};


