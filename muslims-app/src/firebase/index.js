import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArpbQ0cQ1cVwnbax0KzR4G9OrvYMOpnnc",
    authDomain: "daily-life-of-muslim-admin.firebaseapp.com",
    databaseURL: "https://daily-life-of-muslim-admin.firebaseio.com",
    projectId: "daily-life-of-muslim-admin",
    storageBucket: "daily-life-of-muslim-admin.appspot.com",
    messagingSenderId: "402351834931",
    appId: "1:402351834931:web:74576806241e67c3f1a046",
    measurementId: "G-7PG8P04S1N"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };