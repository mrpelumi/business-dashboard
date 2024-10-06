import {initializeApp} from "firebase/app";
// import { onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore";

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

const db = getFirestore(app);

// certificate document object
const certRef = collection(db, "receipt");

// receipt document object
const receiptRef  = collection(db, "receipt")

// revenue document object
const revenueRef = collection(db, "receipt")

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