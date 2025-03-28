import React from "react";

const Alert = ({ type = "info", message, onClose }) => {
  const alertStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
  };

  const icons = {
    success: "✔️",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      className={`flex items-center p-3 border-l-4 rounded-lg shadow-md ${alertStyles[type]} mb-4`}
    >
      <span className="mr-3">{icons[type]}</span>
      <p className="flex-1 text-sm font-semibold">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 text-gray-600 hover:text-gray-800 transition"
      >
        ✖
      </button>
    </div>
  );
};

export default Alert;
