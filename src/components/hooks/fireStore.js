import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firabaseConfig";

const useFireStore = (col, condition, follow) => {
  const [documents, setDocuments] = useState([]);
  const handleSetDocument = (value) => {
    setDocuments((prev) => {
      return [...prev, value];
    });
  };

  useEffect(() => {
    let collectionRef = collection(db, col);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue) {
        setDocuments([]);
        return;
      }
    }
    const q = query(
      collectionRef,
      where(condition.fieldName, condition.operator, condition.compareValue),
      orderBy(follow),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (doc) => {
        setDocuments([]);
        doc.forEach((doc) => {
          handleSetDocument({ ...doc.data(), id: doc.id });
        });
      }
    );
    return unsubscribe;
  }, [col, condition, follow]);

  return documents;
};
export default useFireStore;
