import  firebase from "firebase";
const config = {
  apiKey: "AIzaSyDTggILRijsOBzEC_h4YQS91xni5NUecTo",
  authDomain: "esp32-82eba.firebaseapp.com",
  databaseURL: "https://esp32-82eba-default-rtdb.firebaseio.com",
  projectId: "esp32-82eba",
  storageBucket: "esp32-82eba.appspot.com",
  messagingSenderId: "1089423220425",
  appId: "1:1089423220425:web:91e6cff09ae9ed6eecb718",
  measurementId: "G-57VSG2DPZB"
};

  firebase.initializeApp(config);
  export default firebase;