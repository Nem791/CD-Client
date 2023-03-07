import React from "react";
import { useSelector } from "react-redux";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import VideoItem from "./VideoItem";

const VideoListBox = ({ isOpen, onClick = () => {} }) => {
  const { activeRooms, isUserInRoom } = useSelector((state) => state.video);

  return (
    <div
      className={`box absolute bg-white top-10 right-0 shadow-card rounded-[8px] w-[300px] ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <p className="px-[10px] py-[15px] flex items-center justify-center border-b-[2px]">
        <span className=" flex items-center justify-center font-semibold">
          Video Call Room
        </span>
      </p>
      <div className="px-[10px] max-h-[300px] overflow-x-auto">
        {activeRooms.length === 0 && (
          <div className="text-center w-full px-[10px] py-[15px]">
            <SentimentVeryDissatisfiedIcon
              style={{
                fontSize: "40px",
              }}
            ></SentimentVeryDissatisfiedIcon>

            <div className="mt-[10px]">You don't have any calls</div>
          </div>
        )}
        {activeRooms?.map((video) => {
          return (
            <VideoItem
              key={video.roomId}
              video={video}
              videoId={video.roomId}
              creatorUsername={video.creatorUserName}
              amountOfParticipants={video.participants.length}
              isUserInRoom={isUserInRoom}
            ></VideoItem>
          );
        })}
      </div>
    </div>
  );
};

export default VideoListBox;
