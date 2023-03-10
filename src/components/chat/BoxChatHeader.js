import React from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useDispatch, useSelector } from "react-redux";
import { setShowCardBox } from "../../store/show/showSlice";

const BoxChatHeader = () => {
  const dispatch = useDispatch();
  const { friends, onlineUsers } = useSelector((state) => state.friend);
  const { chosenChatDetails } = useSelector((state) => state.chat);

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    return friends.map((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
      f = { ...f, isOnline: isUserOnline ? true : false };
      return f;
    });
  };

  return (
    <div className="p-[20px] bg-[#4a8063] max-h-[130px] h-full rounded-tl-lg flex justify-between flex-none ">
      <div className="">
        <p className="text-white font-semibold text-[16px]">
          {chosenChatDetails?.name}
        </p>
        <p className="text-white font-sm">
          {chosenChatDetails?.participants?.length} Member
        </p>

        <div className="mt-[8px] grid grid-cols-5 gap-[10px] items-center">
          {/* <div className="relative">
            <img
              src={user?.avatarUrl}
              alt="chao"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div className="w-[10px] h-[10px] bg-green-400 rounded-full absolute top-0 left-[25px]"></div>
          </div> */}
          {checkOnlineUsers(chosenChatDetails.participants, onlineUsers).map(
            (fr) => (
              <div key={fr?.id} className="relative">
                <img
                  src={fr?.avatarUrl}
                  alt="chao"
                  className="w-[35px] h-[35px] rounded-full object-cover"
                />
                {fr.isOnline && (
                  <div className="w-[10px] h-[10px] bg-green-400 rounded-full absolute top-0 left-[25px]"></div>
                )}
              </div>
            )
          )}
        </div>
      </div>
      <div
        className="cursor-pointer hover:text-[white] transition linear duration-200"
        onClick={() => {
          dispatch(setShowCardBox(false));
        }}
      >
        <ClearRoundedIcon></ClearRoundedIcon>
      </div>
    </div>
  );
};

export default BoxChatHeader;
