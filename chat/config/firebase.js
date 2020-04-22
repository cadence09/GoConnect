import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDSBOy8220HG4wW9723lhRKWuqL_B1rCSQ",
    authDomain: "goconnect-a9d82.firebaseapp.com",
    databaseURL: "https://goconnect-a9d82.firebaseio.com",
    projectId: "goconnect-a9d82",
    storageBucket: "goconnect-a9d82.appspot.com",
    messagingSenderId: "271571086000",
    appId: "1:271571086000:web:e80ff3ebd1321fbfbbe975",
    measurementId: "G-JQL43Z1VJJ"
}
// Initialize Firebase
let Firebase=firebase.initializeApp(firebaseConfig)
// firebase.analytics();
export default Firebase