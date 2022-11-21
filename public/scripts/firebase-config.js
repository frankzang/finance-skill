// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBhykXwNK3b_wlCni8hspMAcXpJXQP1WFE',
  authDomain: 'sifinanceskill.firebaseapp.com',
  projectId: 'sifinanceskill',
  storageBucket: 'sifinanceskill.appspot.com',
  messagingSenderId: '573315921667',
  appId: '1:573315921667:web:32cd9633990342e5fb9b36',
  measurementId: 'G-94D2864DS8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
