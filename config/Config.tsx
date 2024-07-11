import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth,} from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmL5e3o6sv6kT64GFZE57mGKn6HiTiyIw",
    authDomain: "pj-prueba-8cce2.firebaseapp.com",
    projectId: "pj-prueba-8cce2",
    storageBucket: "pj-prueba-8cce2.appspot.com",
    messagingSenderId: "577799551756",
    appId: "1:577799551756:web:d587360cfa233309382729"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
//export const auth = getAuth(app);
export const storage = getStorage(app);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});