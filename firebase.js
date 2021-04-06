import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3IKfqYaFWuQk9bBAV4Ftal9StNMZP-8",
  authDomain: "easychathasanugurlu.firebaseapp.com",
  projectId: "easychathasanugurlu",
  storageBucket: "easychathasanugurlu.appspot.com",
  messagingSenderId: "264466049541",
  appId: "1:264466049541:web:aa8acf1235105c3c478a6c",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();

export { db };
