import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGLp_UvigKXZsXvmgRzxTgnS8CzavqMRs",
  authDomain: "chat-app2-938e1.firebaseapp.com",
  projectId: "chat-app2-938e1",
  storageBucket: "chat-app2-938e1.appspot.com",
  messagingSenderId: "375467470015",
  appId: "1:375467470015:web:fe896166cc5180038eea0a",
  measurementId: "G-3W5X1RLM26",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { auth, db };
