import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const CardFront = ({ onClick, cardInfo, index }) => {
  const { cardList } = useSelector((state) => state.card);

  return (
    <div
      className="h-[500px] px-[32px] py-[24px] rounded-xl bg-white shadow-flashcard cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <p className="text-[16px] text-[#939bb4] font-semibold">Term</p>
        <div className="text-[16px] text-[#586380] font-semibold">{`${
          index + 1
        }/${cardList.length}`}</div>
        <div className="p-2 hover:bg-[#eceff4] rounded-full transition-all linear duration-75">
          <StarIcon className="w-5 h-5 text-[#586380]"></StarIcon>
        </div>
      </div>
      <div className="h-[420px] tracking-wider text-[28px] text-[#303545] flex items-center justify-center">
        {cardInfo.word}
      </div>
    </div>
  );
};

export default CardFront;
