import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setMessage,
  setShowAlert,
  setType,
} from "../../store/alert/alertSlice";
import { domain } from "../../utils/common";
const InvitationItem = ({ invitation }) => {
  console.log(invitation);
  const { name, avatarUrl } = invitation.senderId;
  const dispatch = useDispatch();

  const acceptInvitation = async () => {
    try {
      await axios.post(`${domain}/api/v1/friend-invitation/accept`, {
        id: invitation._id,
      });
      dispatch(setShowAlert(true));
      dispatch(setMessage("Accept successfully"));
      dispatch(setType("success"));
    } catch (err) {
      console.log(err);
      dispatch(setShowAlert(true));
      dispatch(setMessage(err.response.data.message));
      dispatch(setType("error"));
    }
  };
  const rejectInvitation = async () => {
    try {
      try {
        await axios.post(`${domain}/api/v1/friend-invitation/reject`, {
          id: invitation._id,
        });
        dispatch(setShowAlert(true));
        dispatch(setMessage("Reject successfully"));
        dispatch(setType("success"));
      } catch (err) {
        console.log(err);
        dispatch(setShowAlert(true));
        dispatch(setMessage(err.response.data.message));
        dispatch(setType("error"));
      }
    } catch (err) {}
  };
  return (
    <div className="flex items-center justify-between w-full px-[10px] py-[15px]">
      <div className="flex items-center">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <div className="ml-[10px] max-w-[220px] text-[12px]">
          <p className="font-semibold">{name}</p>
        </div>
      </div>
      <Box sx={{ display: "flex" }}>
        <IconButton
          style={{ color: "#4dbd97" }}
          // disabled={disabled}
          onClick={acceptInvitation}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          style={{ color: "#ff6262" }}
          // disabled={disabled}
          onClick={rejectInvitation}
        >
          <ClearIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default InvitationItem;
