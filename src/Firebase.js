import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBbMnj1CuYMylBMvRDqMYTqNF8zANlV-gM",
  authDomain: "auth-users-b8892.firebaseapp.com",
  projectId: "auth-users-b8892",
  storageBucket: "auth-users-b8892.appspot.com",
  messagingSenderId: "837941128708",
  appId: "1:837941128708:web:663e5538fdeb16064b0f51"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }