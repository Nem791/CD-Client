import React from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import InvitationBox from "./InvitationBox";
import useToggleValue from "../../hooks/useToggleValue";

const Notification = () => {
  const { value: show, handleToggleValue: handleClick } = useToggleValue();

  return (
    <div className="box-wrapper relative">
      <BellIcon
        className="w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer"
        onClick={handleClick}
      ></BellIcon>
      <InvitationBox isOpen={show} />
    </div>
  );
};

export default Notification;
