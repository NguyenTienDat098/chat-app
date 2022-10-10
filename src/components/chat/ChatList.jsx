import Search from "./Search";
import "./chat.scss";
import { useContext } from "react";
import { HomeContext } from "../../pages/home/Home";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

function ChatList() {
  const HomeData = useContext(HomeContext);
  const { listUser } = HomeData;
  const AuthData = useContext(AuthContext);
  const { users } = AuthData;
  return (
    <div className="w-full h-11/12 ">
      <Search />
      <p className="m-2 font-medium">Online Now</p>
      <ul className="flex items-center overflow-x-scroll user-active">
        {listUser.map((e, i) => {
          if (e.active && e.uid !== users.uid) {
            return (
              <li
                key={e.uid}
                className="p-3 relative m-2  mt-4 rounded-lg cursor-pointer select-none transition-all duration-150 ease-linear"
                style={{ boxShadow: "1px 1px 2px 2px rgba(0,0,0,0.2)" }}
              >
                <img
                  src={e.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full absolute border-2 border-gray-700 z-10"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "-15%",
                  }}
                />
                <p
                  key={i}
                  className="mt-3 text-sm text-center text-gray-700 hover:text-black transition-all duration-200 "
                >
                  {e.displayName}
                </p>
              </li>
            );
          }
          return false;
        })}
      </ul>
    </div>
  );
}

export default ChatList;
