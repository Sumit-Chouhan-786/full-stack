// ButtonGroup.jsx
import React from "react";

const ButtonGroup = ({ buttons, activeButton, onClick }) => {
  return (
    <div className="flex justify-center items-center gap-3 mb-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`bg-gray-200 rounded-md px-3 py-2 ${
            activeButton === index ? "bg-gray-400" : "bg-gray-200"
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
