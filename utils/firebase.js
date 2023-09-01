// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnBlWmslpBWlL8UlHZgz_sFvxfRLQ3umY",
  authDomain: "wijithaelectronics-4896d.firebaseapp.com",
  projectId: "wijithaelectronics-4896d",
  storageBucket: "wijithaelectronics-4896d.appspot.com",
  messagingSenderId: "132539281766",
  appId: "1:132539281766:web:00cfad55712b4a101a58a7",
  measurementId: "G-LEH7ZH6X34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
