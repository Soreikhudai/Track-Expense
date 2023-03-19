// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFu8-Vjj_SFNU9d3lO4PE0uqF6xhYUqiU",
  authDomain: "react-http-project-da8f6.firebaseapp.com",
  databaseURL: "https://react-http-project-da8f6-default-rtdb.firebaseio.com",
  projectId: "react-http-project-da8f6",
  storageBucket: "react-http-project-da8f6.appspot.com",
  messagingSenderId: "673452237248",
  appId: "1:673452237248:web:b4638de5c14c5cb973a825",
};

// Initialize Firebase
export const SoreiApp = initializeApp(firebaseConfig);
