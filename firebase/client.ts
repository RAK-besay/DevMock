
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyACk81ymN-PFdpch65V0HGBuv3_92363O4",
    authDomain: "devmock-1be89.firebaseapp.com",
    projectId: "devmock-1be89",
    storageBucket: "devmock-1be89.firebasestorage.app",
    messagingSenderId: "871564692849",
    appId: "1:871564692849:web:e10fde30089abb9c78bad0",
    measurementId: "G-K34D92DVQ4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) :getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);