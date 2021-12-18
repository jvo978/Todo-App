const firebaseConfig = {
    apiKey: "AIzaSyAz_P0rRlvUIO0sML3zpSMboU4c86h1dh0",
    authDomain: "to-do-list-3024f.firebaseapp.com",
    projectId: "to-do-list-3024f",
    storageBucket: "to-do-list-3024f.appspot.com",
    messagingSenderId: "552890889361",
    appId: "1:552890889361:web:b1652e4efd03cf54a53b30",
    measurementId: "G-H4Y0QT1CKJ"
  };

  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();
  
const db = firebase.firestore();
