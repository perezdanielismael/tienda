import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyDd0lJ_ndXFJCHQhC-MUHG5EbAysu1EVG0",
    authDomain: "tienda-c5e88.firebaseapp.com",
    projectId: "tienda-c5e88",
    storageBucket: "tienda-c5e88.appspot.com",
    messagingSenderId: "894046827446",
    appId: "1:894046827446:web:2f4b5023a18d39b84dc717"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
export {auth, firebase, db, storage}
