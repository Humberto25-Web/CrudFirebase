// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import  'firebase/compat/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkgMB57fAZYYOVWn-oh6lErjO6J_5P13A",
  authDomain: "crudreact-9b579.firebaseapp.com",
  databaseURL: "https://crudreact-9b579-default-rtdb.firebaseio.com",
  projectId: "crudreact-9b579",
  storageBucket: "crudreact-9b579.appspot.com",
  messagingSenderId: "664608489655",
  appId: "1:664608489655:web:0b9038886ad94240f30d32"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
const app=firebaseApp.database().ref();

  export default app;