import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD3fvEetjUDKEinhLFham_pSizV83dtu4U",
    authDomain: "react-firebase-storage-350ba.firebaseapp.com",
    projectId: "react-firebase-storage-350ba",
    storageBucket: "react-firebase-storage-350ba.appspot.com",
    messagingSenderId: "593300414531",
    appId: "1:593300414531:web:9b71dcb5418ba3b371b4f6"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);