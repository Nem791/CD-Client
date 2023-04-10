import React, { useEffect } from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import defaultImg from "../../assets/img/defaultImg/defaulImg.png";

import {
  deleteCard,
  joinSet,
  updateCard,
} from "../../realtimeCommunication/socketConnection";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowCreateCard } from "../../store/show/showSlice";
import { setCardInfo, setCardList } from "../../store/card/slice";
import axios from "axios";
import { domain } from "../../shared/utils/common";

const SubCard = ({ subcard = [] }) => {
  console.log("subcard", subcard);
  const { setId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    joinSet(setId);
  }, [setId]);
  const handleDeleteCard = async () => {
    deleteCard({ cardId: subcard?._id, setId });
    const response = await axios.get(
      `${domain}/api/v1/sets/${setId}/getAllCard`
    );
    const { cardList } = response.data.data;
    dispatch(setCardList(cardList));
  };

  const handleUpdateCard = () => {
    dispatch(setCardInfo(subcard));
    dispatch(setShowCreateCard(true));
  };

  const handleLearned = async () => {
    const cardId = subcard._id;
    const cardDataUpdate = {
      isLearned: !subcard?.isLearned,
    };

    updateCard({ cardDataUpdate, cardId, setId });
    const response = await axios.get(
      `${domain}/api/v1/sets/${setId}/getAllCard`
    );
    const { cardList } = response.data.data;
    dispatch(setCardList(cardList));
  };
  return (
    <div className="p-[16px] shadow-flashcard bg-white rounded-lg cursor-pointer">
      <div className="flex items-center">
        <div className="px-[32px] w-[20%] text-[16px] text-[#1a1d28]">
          {subcard?.word}
        </div>
        <div className="flex items-center justify-evenly border-l-[1px] w-[60%]">
          <div className="px-[32px] text-[16px] text-[#1a1d28] w-[40%]">
            {subcard?.meaningUsers}
          </div>
          {subcard?.mimeType === "image" && (
            <div>
              <img
                src={
                  subcard?.fileUrl?.length > 0 ? subcard?.fileUrl : defaultImg
                }
                alt="word-img"
                className="w-[200px] h-[200px] object-cover"
              />
            </div>
          )}
          {subcard?.mimeType === "video" && (
            <div className="bg-white w-full rounded-xl">
              <video className="w-[200px] h-[200px] object-cover" controls>
                <source src={subcard?.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end text-[#586380] w-[20%]">
          <div
            onClick={handleLearned}
            className={`p-2 hover:bg-[#eceff4] hover:text-[#ffcd1f] hover:mb-[8px] ${
              subcard?.isLearned ? "bg-[#eceff4] text-[#ffcd1f]" : ""
            } rounded-full transition-all linear duration-75 cursor-pointer`}
          >
            <StarRoundedIcon className="text-[24px]" />
          </div>
          <div
            className="p-2 hover:bg-[#eceff4] hover:text-blue-400 hover:mb-[8px] rounded-full transition-all linear duration-75 cursor-pointer"
            onClick={handleUpdateCard}
          >
            <CreateRoundedIcon className="text-[24px]" />
          </div>
          <div
            className="p-2 hover:bg-[#eceff4] hover:text-red-400 hover:mb-[8px] rounded-full transition-all linear duration-75 cursor-pointer"
            onClick={handleDeleteCard}
          >
            <DeleteRoundedIcon className="text-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCard;
