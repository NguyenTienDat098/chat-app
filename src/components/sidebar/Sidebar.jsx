import {
  faGear,
  faUserGroup,
  faAddressBook,
  faMessage,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import Tippy from "@tippyjs/react/headless";

const menuItem = [
  {
    name: "Edit Profile",
    link: "/edit-profile",
  },
];

function SideBar() {
  const AuthData = useContext(AuthContext);
  const [visibleTippy, setVisibleTippy] = useState(false);
  const { users, logout } = AuthData;
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="side-bar absolute bottom-0 w-full h-14 p-1 border-t-2 border-gray-400 bg-white">
      <ul className="list-menu flex items-center justify-evenly">
        <li className="item w-6 h-6 rounded-md shadow-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-none transition-all duration-100 ease-linear">
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li className="item w-6 h-6 rounded-md shadow-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-none transition-all duration-100 ease-linear">
          <FontAwesomeIcon icon={faUserGroup} />
        </li>
        <li className="item w-6 h-6 rounded-md shadow-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-none transition-all duration-100 ease-linear">
          <FontAwesomeIcon icon={faMessage} />
        </li>
        <li className="item w-6 h-6 rounded-md shadow-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-none transition-all duration-100 ease-linear">
          <a href="https:www.youtube.com">
            <FontAwesomeIcon icon={faAddressBook} />
          </a>
        </li>
        <li className="item w-6 h-6 rounded-md shadow-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-none transition-all duration-100 ease-linear">
          <FontAwesomeIcon icon={faGear} />
        </li>
        <Tippy
          interactive
          onClickOutside={() => {
            setVisibleTippy(false);
          }}
          visible={visibleTippy}
          render={(attrs) => (
            <div
              className="box min-w-40 rounded-lg shadow-md p-5 flex items-center justify-center flex-col"
              tabIndex="-1"
              {...attrs}
            >
              {menuItem.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center w-full mb-2 p-2 cursor-pointer select-none hover:bg-gray-400 transition-all duration-200 ease-linear rounded-lg"
                  >
                    {e.name}
                  </div>
                );
              })}
              <div
                className="flex items-center w-full p-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="mr-1 cursor-pointer"
                />
                <p className="cursor-pointer">logout</p>
              </div>
            </div>
          )}
        >
          <li
            className="item cursor-pointer"
            onClick={() => {
              setVisibleTippy((prev) => {
                return prev ? false : true;
              });
            }}
          >
            <img
              src={
                users.photoURL
                  ? users.photoURL
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </li>
        </Tippy>
      </ul>
    </div>
  );
}

export default SideBar;
