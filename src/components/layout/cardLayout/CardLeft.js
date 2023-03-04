import React from "react";
import SetFeature from "../sets/SetFeature";
import SpeakRoom from "../sets/SpeakRoom";

const CardLeft = () => {
  return (
    <div className="max-w-[30%] w-full">
      <SetFeature></SetFeature>
      <SpeakRoom></SpeakRoom>
    </div>
  );
};

export default CardLeft;
