import React from "react";

const LineText = ({ className = "" }) => {
  return (
    <div className="line mt-[40px] mb-[30px]">
      <span className={`line-text ${className}`}>or</span>
    </div>
  );
};

export default LineText;
