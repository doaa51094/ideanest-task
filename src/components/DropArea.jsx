import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(e) => e.preventDefault()}
      className={` ${
        showDrop
          ? "opacity-100 bg-[#f4f2ff] rounded-md text-[18px] px-5 py-8 transition-all duration-[500ms] ease-in-out mt-2"
          : "opacity-0 "
      }`}
    >
      Drop here
    </div>
  );
};

export default DropArea;
