import firebase from "firebase"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSIL9ioq0rS2eGE3GW4QwumFUCNCNy-50",
  authDomain: "foodrangers-88ec9.firebaseapp.com",
  projectId: "foodrangers-88ec9",
  storageBucket: "foodrangers-88ec9.appspot.com",
  messagingSenderId: "1053913085927",
  appId: "1:1053913085927:web:811809157377c348faaf42",
  measurementId: "G-SG6YSVY92Z"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
