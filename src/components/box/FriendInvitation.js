import React from "react";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch } from "react-redux";
import { setShowInvitationBox } from "../../store/show/showSlice";

const FriendInvitation = ({ className = "" }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setShowInvitationBox(true));
      }}
    >
      <PersonAddIcon
        className={`w-5 h-5 text-[#586380] hover:opacity-[0.5] cursor-pointer ${className}`}
      ></PersonAddIcon>
    </div>
  );
};

export default FriendInvitation;
