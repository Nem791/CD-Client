import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDispatch } from "react-redux";
import { setShowEventModal } from "../../store/schedule/scheduleSlice";
const CreateEventButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setShowEventModal(true));
      }}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <AddRoundedIcon className="text-7"></AddRoundedIcon>
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
