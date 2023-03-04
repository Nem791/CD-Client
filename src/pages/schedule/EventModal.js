import React, { useState } from "react";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  setSavedEvent,
  setShowEventModal,
} from "../../store/schedule/scheduleSlice";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SegmentIcon from "@mui/icons-material/Segment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { domain } from "../../utils/common";

import { useParams } from "react-router-dom";
import {
  createSchedule,
  deleteSchedule,
  updateSchedule,
} from "../../realtimeCommunication/socketConnection";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const { daySelected, selectedEvent } = useSelector((state) => state.schedule);
  const { userId } = useParams();

  console.log({ daySelected, selectedEvent });

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDiscription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      createdBy: userId,
    };

    if (selectedEvent) {
      const selectedEventId = selectedEvent._id;
      updateSchedule({ calendarEvent, selectedEventId });
      dispatch(setShowEventModal(false));
    } else {
      try {
        createSchedule(calendarEvent);
        dispatch(setShowEventModal(false));
      } catch (err) {
        dispatch(setShowEventModal(false));
      }
    }
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <DragHandleRoundedIcon className="text-gray-400"></DragHandleRoundedIcon>
          <div>
            {selectedEvent && (
              <DeleteIcon
                className="text-gray-400 cursor-pointer"
                onClick={async () => {
                  try {
                    // await axios.delete(
                    //   `${domain}/api/v1/schedule/${selectedEvent.id}`
                    // );
                    const selectedEventId = selectedEvent._id;

                    deleteSchedule(selectedEventId);
                    dispatch(setShowEventModal(false));
                  } catch (err) {
                    console.log(err);
                  }
                }}
              ></DeleteIcon>
            )}
            <button
              onClick={() => {
                dispatch(setShowEventModal(false));
              }}
            >
              <CloseRoundedIcon className="text-gray-400"></CloseRoundedIcon>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={selectedEvent?.title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-[12px]">
              <ScheduleIcon className="text-gray-400"></ScheduleIcon>
              <p>{daySelected?.format("dddd, MMMM DD")}</p>
            </div>
            <div className="flex gap-[12px]">
              <SegmentIcon className="text-gray-400"></SegmentIcon>
              <input
                type="text"
                name="description"
                placeholder="Add a description"
                value={selectedEvent?.description}
                required
                className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onChange={(e) => setDiscription(e.target.value)}
              />
            </div>
            <div className="flex gap-[12px]">
              <BookmarkBorderIcon className="text-gray-400"></BookmarkBorderIcon>
              <div className="flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => {
                      setSelectedLabel(lblClass);
                    }}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <CheckIcon className="text-white text-sm"></CheckIcon>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
