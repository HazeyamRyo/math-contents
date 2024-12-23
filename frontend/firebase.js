// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd17lzM29GNSnH7NfR50WjhouLcuH4Hko",
  authDomain: "math-contents.firebaseapp.com",
  projectId: "math-contents",
  storageBucket: "math-contents.firebasestorage.app",
  messagingSenderId: "43132682820",
  appId: "1:43132682820:web:bb525dcfe17c6fe2137211",
  measurementId: "G-2K3L08KRCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };