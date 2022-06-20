import firebase from '.firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBdQzuRKKwW3swGwo1pSgm6-D0DiDnKHn4",
    authDomain: "btwn-ui.firebaseapp.com",
    projectId: "btwn-ui",
    storageBucket: "btwn-ui.appspot.com",
    messagingSenderId: "99136938186",
    appId: "1:99136938186:web:23188bbb3b40e066b71433"
  };

  firebase.initializeApp(config);


  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  function login() {
    return auth.signInWithPopup(provider);
  }

  function logout() {
    return auth.signOut();
  }
  

  export {auth, login, logout};