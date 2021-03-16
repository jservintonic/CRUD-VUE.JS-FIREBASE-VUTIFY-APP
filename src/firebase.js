import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBY60gwb1Ki5fuElDUGQ0IHdiP86xXqWog",
    authDomain: "osprebirdadmin.firebaseapp.com",
    projectId: "osprebirdadmin",
    storageBucket: "osprebirdadmin.appspot.com",
    messagingSenderId: "1035609071773",
    appId: "1:1035609071773:web:dfe704f3b7990cf513f474",
    measurementId: "G-GL6K3Z6EJM"
  };

  firebase.initializeApp(firebaseConfig)

  //util

  const db = firebase.firestore()

  const auth = firebase.auth()

  const storage = firebase.storage()

  // colection ref

  const userCollection = db.collection('users')

  const adminPanel = db.collection('admin')


  export {
      db,
      auth,
      storage,
      userCollection,
      adminPanel
  }