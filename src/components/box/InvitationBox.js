import React from "react";
import { useSelector } from "react-redux";
import InvitationItem from "./InvitationItem";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const InvitationBox = ({ isOpen = false }) => {
  // const { pendingMemberInvitations } = useSelector((state) => state.member);
  const { pendingFriendInvitation } = useSelector((state) => state.friend);
  // console.log(pendingMemberInvitations);

  return (
    <div
      className={`box absolute bg-white top-10 right-0 shadow-card rounded-[8px] w-[300px] overflow-hidden ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <p className="px-[10px] py-[15px] flex items-center justify-center border-b-[2px]">
        <span className=" flex items-center justify-center font-semibold">
          Friend request
        </span>
      </p>
      <div className="px-[10px]  max-h-[300px] overflow-x-auto">
        {pendingFriendInvitation.length === 0 && (
          <div className="text-center w-full px-[10px] py-[15px]">
            <SentimentVeryDissatisfiedIcon
              style={{
                fontSize: "40px",
              }}
            ></SentimentVeryDissatisfiedIcon>

            <div className="mt-[10px]">
              You don't have any friend request currently
            </div>
          </div>
        )}
        {pendingFriendInvitation.map((invitation) => {
          return (
            <InvitationItem key={invitation._id} invitation={invitation} />
          );
        })}
      </div>
    </div>
  );
};

export default InvitationBox;
