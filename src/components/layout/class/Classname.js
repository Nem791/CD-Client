import React from "react";

const Classname = ({ classInfo }) => {
  return (
    <div className="flex items-center">
      <img
        src="https://img.icons8.com/dusk/64/40C057/class.png"
        className="object-cover"
        alt="class-icon"
      />
      <div className="text-[35px] font-semibold ml-[18px]">
        {classInfo?.name || "Classname"}
      </div>
    </div>
  );
};

export default Classname;
