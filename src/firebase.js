import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC7-zeY5dRlqIr01_PpOZc1Njis7uj0Spo",
    authDomain: "supertails-mobile-app.firebaseapp.com",
    projectId: "supertails-mobile-app",
    storageBucket: "supertails-mobile-app.appspot.com",
    messagingSenderId: "622892890714",
    appId: "1:622892890714:web:920a7e0a91539a09673663",
    measurementId: "G-JXN3BSBV1M"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;