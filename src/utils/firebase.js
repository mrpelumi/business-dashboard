import {initializeApp} from "firebase/app";
// import { onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECURE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// certificate document object
const certRef = collection(db, "certificate");

// receipt document object
const receiptRef  = collection(db, "receipt")

// revenue document object
const revenueRef = collection(db, "taxApp")

// user document object
const userRef = collection(db, "userProfile")

//get certificate document list
export const getDocCert = async () =>{
  const querySnapshot = await getDocs(certRef);
  return querySnapshot
}

//get receipt document list
export const getDocReceipt = async () => {
  const querySnapshot = await getDocs(receiptRef);
  return querySnapshot;
}

// get revenue document list
export const getDocRevenue = async () => {
  const querySnapshot = await getDocs(revenueRef);
  return querySnapshot;
}

// get user document list
export const getDocUserProfile = async () => {
  const querySnapshot = await getDocs(userRef);
  return querySnapshot;
}

// sign in email and password
export const signInAuthEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutAuthUser = async () => {
  return await signOut(auth);
}