import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firabaseConfig";
import { addUser, getDocument, updataDocumment } from "../../firebase/services";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const history = useNavigate();
  const [users, setUsers] = useState({});

  //
  const handleSetUser = (value) => {
    setUsers((prev) => {
      return {
        ...value,
      };
    });
  };
  //
  const emailSignUp = (email, password, userName) => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const secret = Math.round(Math.random() * 100000000 - 1);
      const res = getAdditionalUserInfo(result);
      if (res.isNewUser) {
        addUser("users", {
          uid: result.user.uid,
          photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          displayName: userName,
          email: email,
          active: true,
          secret: secret,
        });
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log(result.user);
        })
        .catch((error) => {
          console.log("Error: " + error.code + " " + error.message);
        });
    });
  };
  //
  const emailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log("Error: " + error.code + " " + error.message);
      });
  };
  const googleSignIn = () => {
    const secret = Math.round(Math.random() * 100000000 - 1);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then((result) => {
      const res = getAdditionalUserInfo(result);
      if (res.isNewUser) {
        addUser("users", {
          displayName: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          photoURL: result.user.photoURL,
          active: true,
          secret: secret.toString(),
        });
      }
    });
  };

  const logout = () => {
    updataDocumment("users", users.uid, {
      active: false,
    });
    signOut(auth);
    setUsers({});
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, uid, photoURL } = currentUser;
        const secretPromise = getDocument("users", uid);
        secretPromise.then((result) => {
          setUsers({
            displayName,
            email,
            uid,
            photoURL,
            secret: result,
          });
        });
        history("/");
        return;
      }
      setUsers({});
    });
    return () => {
      unsubcribe();
    };
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        users,
        googleSignIn,
        logout,
        handleSetUser,
        emailSignUp,
        emailSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
