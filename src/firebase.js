// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHzH1D_Abuf8tTKjwf5gFGwwg_aCtfZi0",
  authDomain: "personal-379907.firebaseapp.com",
  projectId: "personal-379907",
  storageBucket: "personal-379907.appspot.com",
  messagingSenderId: "432208039783",
  appId: "1:432208039783:web:f163b5ad4b3f80d454e9c2",
  measurementId: "G-FCC6S1R8GW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getStorage } from "firebase/storage";
const storage = getStorage(app);

export { storage };
