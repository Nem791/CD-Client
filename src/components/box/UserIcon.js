import React from "react";
import useAuthStateChanged from "../../hooks/useAuthStateChanged";
import useToggleValue from "../../hooks/useToggleValue";
import UserBox from "./UserBox";

const UserIcon = () => {
  const { value: show, handleToggleValue: handleClick } = useToggleValue();
  const { user } = useAuthStateChanged();
  // console.log(user);
  return (
    <div className="box-wrapper relative" onClick={handleClick}>
      <img
        src={user.avatarUrl}
        alt="avatar"
        className="w-8 h-8 rounded-full object-cover cursor-pointer"
      />
      <UserBox isOpen={show}></UserBox>
    </div>
  );
};

export default UserIcon;
