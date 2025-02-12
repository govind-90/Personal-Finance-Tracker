// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc,setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkkBEgad_A-YJQ2WxpKO9ZNxYmzYgxpmU",
  authDomain: "my-personal-finance-app-40ece.firebaseapp.com",
  projectId: "my-personal-finance-app-40ece",
  storageBucket: "my-personal-finance-app-40ece.appspot.com",
  messagingSenderId: "20974304210",
  appId: "1:20974304210:web:c3712daf5e5cc5295c660b",
  measurementId: "G-6E3NCX36MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc}