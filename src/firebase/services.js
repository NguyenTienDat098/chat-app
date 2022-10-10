import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firabaseConfig";

export const addDocument = async (col, data) => {
  const collectionRef = doc(collection(db, col));
  await setDoc(collectionRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const addUser = async (col, data) => {
  await setDoc(doc(db, col, data.uid), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updataDocumment = async (col, id, data) => {
  const collectionRef = doc(db, col, id);
  await updateDoc(collectionRef, {
    ...data,
  });
};

export const getDocument = async (col, id) => {
  const q = query(collection(db, col), where("uid", "==", id));
  let result;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result = doc.data().secret;
  });
  return Promise.resolve(result);
};
