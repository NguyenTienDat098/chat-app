import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firabaseConfig";
import SideBar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import Login from "../login/Login";
import Chat from "../../components/chat/Chat";
import ChatWindow from "../../components/chat/ChatWindow";

export const HomeContext = createContext();

function Home() {
  const authContext = useContext(AuthContext);
  const AuthData = authContext;
  const { users } = AuthData;
  const [listUser, setListUser] = useState([]);
  const [listUserSearch, setListUserSearch] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chatInfor, setChatInfor] = useState({});
  //

  //
  const handleShowChatWindow = (value) => {
    setChatInfor((prev) => {
      return {
        ...value,
      };
    });
    setShowChat((prev) => {
      return prev ? false : true;
    });
  };
  const handleSetListUserSearch = (value) => {
    setListUserSearch(value);
  };
  const handleSetListUser = (value) => {
    setListUser((prev) => {
      return value;
    });
  };
  useEffect(() => {
    if (!AuthData.users.uid) {
      setListUser((prev) => {
        return [];
      });
    }

    onSnapshot(
      collection(db, "users"),
      { includeMetadataChanges: true },
      (doc) => {
        setListUser((prev) => {
          return [];
        });
        doc.forEach((e) => {
          setListUser((prev) => {
            return [...prev, e.data()];
          });
        });
      }
    );
  }, [AuthData.users.uid]);

  if (!users.uid) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
    <HomeContext.Provider
      value={{
        listUser,
        listUserSearch,
        handleSetListUser,
        handleSetListUserSearch,
        showChat,
        handleShowChatWindow,
        chatInfor,
      }}
    >
      <div className="relative w-full h-screen overflow-hidden">
        <Chat />
        <ChatWindow />
        <SideBar />
      </div>
    </HomeContext.Provider>
  );
}

export default Home;
