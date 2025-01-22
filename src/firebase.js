import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyBwNjQdGGxlil3_F82wTrEpI96lND5urO8",
  authDomain: "grievance-portal-ce26f.firebaseapp.com",
  projectId: "grievance-portal-ce26f",
  storageBucket: "grievance-portal-ce26f.firebasestorage.app",
  messagingSenderId: "1013317876053",
  appId: "1:1013317876053:web:bc5a1eb919c9ea494a57dc"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

