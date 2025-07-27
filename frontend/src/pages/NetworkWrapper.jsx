import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiAlertTriangle } from "react-icons/fi";

const NetworkWrapper = ({ children, onReconnect }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => {
      const status = navigator.onLine;
      setIsOnline(status);

      if (status) {
        toast.success(" Back Online!");
        if (onReconnect) {
          onReconnect(); // Auto refetch here
        }
      } else {
        return toast.error("⚠️ You are offline");
      }
    };

    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [onReconnect]);

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center h-screen mx-auto bg-zinc-900  text-center p-6 ">
        <h1 className="text-3xl font-bold mb-4 text-red-300"><span><FiAlertTriangle className="text-xl mr-2 text-center"/></span> You Are Offline</h1>
        
        <p className="text-lg text-amber-100">Please check your internet connection.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default NetworkWrapper;
