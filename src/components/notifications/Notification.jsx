import {
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import "./notification.scss";

function Notification() {
  const AuthData = useContext(AuthContext);
  const { showNotification } = AuthData;
  if (
    showNotification.active &&
    showNotification.type === "warning" &&
    showNotification.message !== ""
  ) {
    return (
      <div
        className="fixed top-5 right-5 h-14 rounded-lg flex items-center overflow-hidden"
        style={{
          border: "2px solid #ff7675",
          boxShadow: "1px 3px 6px 2px rgba(0,0,0,0.3)",
          animation: "appear 0.75s ease",
        }}
      >
        <div
          style={{ backgroundColor: "#ff7675" }}
          className="flex items-center justify-center text-white h-full"
        >
          <FontAwesomeIcon icon={faTriangleExclamation} className="p-2" />
        </div>
        <p className="ml-2 mr-2">{showNotification.message}</p>
      </div>
    );
  } else if (
    showNotification.active &&
    showNotification.type === "success" &&
    showNotification.message !== ""
  ) {
    return (
      <div
        className="fixed top-5 right-5 h-14 rounded-lg flex items-center overflow-hidden"
        style={{
          border: "2px solid #00b894",
          boxShadow: "1px 3px 6px 2px rgba(0,0,0,0.3)",
          animation: "appear 0.75s ease",
        }}
      >
        <div
          style={{ backgroundColor: "#00b894" }}
          className="flex items-center justify-center text-white h-full"
        >
          <FontAwesomeIcon icon={faCircleCheck} className="p-2" />
        </div>
        <p className="ml-2 mr-2">{showNotification.message}</p>
      </div>
    );
  }
}

export default Notification;
