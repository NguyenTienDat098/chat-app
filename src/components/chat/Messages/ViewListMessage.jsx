import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import { HomeContext } from "../../../pages/home/Home";
import { updataDocumment } from "../../../firebase/services";
import useFireStore from "../../hooks/fireStore";

function ViewListMessage() {
  const AuthData = useContext(AuthContext);
  const { users } = AuthData;
  const HomeData = useContext(HomeContext);
  const { chatInfor, listUser, listUserSearch, handleShowChatWindow } =
    HomeData;
  //
  const messageCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: parseInt(
        parseInt(chatInfor.secret) + parseInt(users.secret)
      ).toString(),
    };
  }, [chatInfor, users]);
  const currentMessages = useFireStore("messages", messageCondition, "roomId");
  // check has network
  const hasNetwork = (online) => {
    updataDocumment("users", users.uid, {
      active: online,
    });
  };

  useEffect(() => {
    const handleCheckOnline = () => {
      if (users.uid) {
        hasNetwork(navigator.onLine);
        window.addEventListener("online", () => {
          hasNetwork(true);
        });

        window.addEventListener("offline", () => {
          hasNetwork(false);
        });
      }
    };
    window.addEventListener("load", handleCheckOnline());
    return () => {
      window.removeEventListener("load", handleCheckOnline());
    };
  }, []);

  // set active use false when leave the page
  useEffect(() => {
    window.onbeforeunload = () => {
      hasNetwork(false);
    };
  }, []);

  return (
    <div className="w-full">
      <p className="m-2 mb-0 font-medium">Chat Now</p>
      <ul
        className="p-3 overflow-y-scroll list-chat"
        style={{ height: "600px", paddingBottom: 100 }}
      >
        {listUserSearch.length > 0
          ? listUserSearch.map((e) => {
              if (e.uid !== users.uid) {
                return (
                  <li
                    onClick={() => {
                      handleShowChatWindow({
                        currentNameUserChat: e.displayName,
                        currentUidUserChat: e.uid,
                        active: e.active,
                        avatar: e.photoURL,
                        secret: e.secret,
                      });
                    }}
                    key={e.uid}
                    className="m-2 ml-0 flex items-center cursor-pointer select-none hover:bg-gray-300 rounded-lg p-2"
                  >
                    <div className="flex items-center relative">
                      <img
                        src={e.photoURL}
                        alt="avatar"
                        className="w-10 h-10 object-cover rounded-full border-2 border-gray-600"
                      />
                      <div
                        className="status w-3 h-3 bottom-0 absolute right-0 rounded-full"
                        style={
                          e.active
                            ? { backgroundColor: "#00b894" }
                            : { backgroundColor: "#636e72" }
                        }
                      ></div>
                    </div>
                    <div>
                      <p className="ml-3">{e.displayName}</p>
                      <p className="text-sm ml-3 text-gray-500">
                        Lorem ipsum dolor sit
                      </p>
                    </div>
                  </li>
                );
              }
              return false;
            })
          : listUser.map((e) => {
              if (e.uid !== users.uid) {
                return (
                  <li
                    onClick={() => {
                      handleShowChatWindow({
                        currentNameUserChat: e.displayName,
                        currentUidUserChat: e.uid,
                        active: e.active,
                        avatar: e.photoURL,
                        secret: e.secret,
                      });
                    }}
                    key={e.uid}
                    className="m-2 ml-0 flex items-center cursor-pointer select-none hover:bg-gray-300 rounded-lg p-2"
                  >
                    <div className="flex items-center relative">
                      <img
                        src={e.photoURL}
                        alt="avatar"
                        className="w-10 h-10 object-cover rounded-full border-2 border-gray-600"
                      />
                      <div
                        className="status w-3 h-3 bottom-0 absolute right-0 rounded-full"
                        style={
                          e.active
                            ? { backgroundColor: "#00b894" }
                            : { backgroundColor: "#636e72" }
                        }
                      ></div>
                    </div>
                    <div>
                      <p className="ml-3">{e.displayName}</p>
                      {currentMessages.map((e, i) => {
                        if (i === currentMessages.length - 1) {
                          return (
                            <p className="text-sm ml-3 text-gray-500">
                              {e.content}
                            </p>
                          );
                        }
                        return (
                          <p className="text-sm ml-3 text-gray-500">
                            No messages
                          </p>
                        );
                      })}
                    </div>
                  </li>
                );
              }
              return false;
            })}
      </ul>
    </div>
  );
}

export default ViewListMessage;
