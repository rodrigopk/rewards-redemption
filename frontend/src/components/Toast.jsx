import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const fadeOutTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose(), 300);
    }, 1000);

    return () => clearTimeout(fadeOutTimer);
  }, [onClose]);

  const baseStyle =
    "fixed bottom-5 right-5 px-4 py-2 rounded text-white shadow-lg transition-all duration-300 transform";
  const color =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-gray-500";

  return (
    <div
      className={`${baseStyle} ${color} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Toast;
