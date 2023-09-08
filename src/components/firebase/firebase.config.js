// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWN2R3VgyGR-YMn-V-NyffPexM-s5bM7c",
  authDomain: "task-management-app-f5e27.firebaseapp.com",
  projectId: "task-management-app-f5e27",
  storageBucket: "task-management-app-f5e27.appspot.com",
  messagingSenderId: "421684455502",
  appId: "1:421684455502:web:f6ae9781faaf5e57787b1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;