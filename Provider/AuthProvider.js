// authProvider.js
"use client";
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const firebaseConfig = {
  // Your Firebase config details here
  apiKey: "AIzaSyBv5o9wisLho90U-2XgJSl7Z3PT7sSHfgE",
  authDomain: "endgame-team-project.firebaseapp.com",
  projectId: "endgame-team-project",
  storageBucket: "endgame-team-project.appspot.com",
  messagingSenderId: "49379562265",
  appId: "1:49379562265:web:b89b8fb280bcfa879d6b88"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = React.createContext();

const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const setUserInLocalStorage = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUserInLocalStorage(userCredential.user);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const signup = async (email, password, username, gender, age, country) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUserInLocalStorage(userCredential?.user);

    if (userCredential) {
      const currentDate = new Date().toISOString();
      await axios.post('https://endgame-team-server.vercel.app/users', {
        uid: userCredential.user.uid,
        userName: username,
        photoURL: userCredential.user.photoURL,
        email: userCredential.user.email,
        provider: 'manual',
        isAdmin: false,
        isPayment: false,
        signupDate: currentDate,
        gender: gender,
        age: age,
        status: 'enable',
        country: country,
        isVerify: false,
      });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    setUserInLocalStorage(userCredential.user);

    if (userCredential) {
      const currentDate = new Date().toISOString();
      await axios.post('https://endgame-team-server.vercel.app/users', {
        uid: userCredential.user.uid,
        userName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        email: userCredential.user.email,
        provider: 'google',
        isAdmin: false,
        isPayment: false,
        signupDate: currentDate,
        gender: "",
        age: "",
        status: 'enable',
        country: "",
        isVerify: false,
      });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  return getUserFromLocalStorage();
};

export const signInWithGithub = async () => {
  try {
    await signInWithPopup(auth, githubProvider);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, getCurrentUser, login, signup, logout, signInWithGoogle, signInWithGithub }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
