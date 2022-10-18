import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { addDocument } from "../../firebase/services";
import { HomeContext } from "../../pages/home/Home";
import useFireStore from "../hooks/fireStore";

function ChatWindow() {
  const HomeData = useContext(HomeContext);
  const AuthData = useContext(AuthContext);
  const { users } = AuthData;
  const { showChat, handleShowChatWindow, chatInfor } = HomeData;
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const chatContentRef = useRef();

  // console.log(chatInfor);
  // console.log(users);

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
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [currentMessages]);

  const handleSendMessage = (valueMessage) => {
    if (valueMessage !== "") {
      addDocument("messages", {
        uid: users.uid,
        idUserSend: users.uid,
        idUserReceived: chatInfor.currentUidUserChat,
        content: valueMessage,
        roomId: parseInt(
          parseInt(chatInfor.secret) + parseInt(users.secret)
        ).toString(),
      });
      setMessage("");
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handlePressEnter = (e) => {
      if (e.keyCode === 13) {
        if (message !== "") {
          addDocument("messages", {
            uid: users.uid,
            idUserSend: users.uid,
            idUserReceived: chatInfor.currentUidUserChat,
            content: message,
            roomId: parseInt(
              parseInt(chatInfor.secret) + parseInt(users.secret)
            ).toString(),
          });
          setMessage("");
          inputRef.current.focus();
        }
      }
    };
    window.addEventListener("keyup", handlePressEnter);
    return () => {
      window.removeEventListener("keyup", handlePressEnter);
    };
  }, [chatInfor, users, message]);

  if (showChat) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-20 bg-white flex flex-col">
        <div className="h-14 p-2 border-b-2 border-gray-500 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={chatInfor.avatar}
              alt="avatar"
            />
            <div className="ml-2">
              <p>{chatInfor.currentNameUserChat}</p>
              <p className="text-sm">
                {chatInfor.active ? "Online Now" : "Offline"}
              </p>
            </div>
          </div>
          <FontAwesomeIcon
            onClick={() => {
              handleShowChatWindow();
            }}
            icon={faCaretLeft}
            className="text-xl cursor-pointer"
          />
        </div>
        <div
          className="flex-1 p-2 overflow-y-scroll chat-window scroll-smooth"
          ref={chatContentRef}
        >
          {currentMessages.map((e, i) => {
            if (e.idUserReceived !== chatInfor.currentUidUserChat) {
              return (
                <div className="your-message w-full h-14 mb-4 relative" key={i}>
                  <div className="flex">
                    <img
                      className="w-8 h-8 rounded-full object-cover border border-gray-500"
                      src={chatInfor.avatar}
                      alt="avatar"
                    />
                    <div className="relative w-full ml-2 show-your-message">
                      <div
                        className="absolute left-0 p-2 bg-blue-600 rounded-xl text-white"
                        style={{
                          maxWidth: 300,
                        }}
                      >
                        <p>{e.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="my-message relative w-full h-14" key={i}>
                  <div
                    className="absolute right-0 p-2 bg-blue-600 rounded-xl text-white show-my-message"
                    style={{
                      transform: "translateY(-50%)",
                      top: "50%",
                      maxWidth: 300,
                    }}
                  >
                    <p>{e.content}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="h-14 p-2 border-t-2 border-gray-500 flex items-center justify-center">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => {
              setMessage((prev) => {
                return e.target.value;
              });
            }}
            type="text"
            placeholder="Type your message here !!!"
            className="mr-3 rounded-lg  p-2 outline-none w-9/12"
          />
          <button
            className="rounded-lg p-2 text-white bg-blue-900"
            onClick={() => {
              handleSendMessage(message);
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatWindow;
