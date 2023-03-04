import React, { useEffect, useRef } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  setCardDetail,
  setCardShow,
} from "../../store/cardDetailShow/cardDetailSlice";

const CardBack = ({ onClick, cardInfo }) => {
  const dispatch = useDispatch();
  const playAudio = useRef({});
  const speakRef = useRef("");
  const infoRef = useRef("");
  const openCardDetail = useRef({});
  playAudio.current = () => {
    if (cardInfo.audio) {
      let audioWord = cardInfo.audio;
      let audio = new Audio(audioWord);
      audio.play();
    }
  };

  openCardDetail.current = () => {
    dispatch(setCardDetail(cardInfo));
    dispatch(setCardShow(true));
  };

  const speakDom = speakRef.current;
  const infoDom = infoRef.current;
  useEffect(() => {
    if (speakDom) {
      speakDom.addEventListener("click", playAudio.current);
    }
    // Cleanup funtion
    return () => {
      if (speakDom) {
        speakDom.removeEventListener("click", playAudio.current);
      }
    };
  }, [speakDom]);

  useEffect(() => {
    if (infoDom) {
      infoDom.addEventListener("click", openCardDetail.current);
    }
    // Cleanup funtion
    return () => {
      if (infoDom) {
        infoDom.removeEventListener("click", openCardDetail.current);
      }
    };
  }, [infoDom]);

  return (
    <div
      className="h-[500px] rounded-xl bg-white shadow-flashcard flex cursor-pointer"
      onClick={onClick}
    >
      <div className="px-[32px] py-[24px] max-w-[50%] w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-[16px] text-[#939bb4] font-semibold">
              Definition
            </p>
            <div className="ml-[4px] hover:bg-[#eceff4] rounded-full p-2">
              <SpeakerWaveIcon
                className="w-5 h-5 text-[#586380]"
                // onClick={playAudio(cardInfo.audio)}
                ref={speakRef}
              ></SpeakerWaveIcon>
            </div>
          </div>
          <div className="hover:bg-[#eceff4] rounded-full p-2">
            <InformationCircleIcon
              className="w-5 h-5 text-[#586380]"
              ref={infoRef}
            ></InformationCircleIcon>
          </div>
        </div>
        <div className="h-[420px] flex flex-col items-center justify-center">
          <div className="leading-8 text-[28px] text-[#303545]">
            {cardInfo.meaningUsers}
          </div>
          <div className="text-[#bebebe] mt-2">{cardInfo.pronounce}</div>
          <div className="font-semibold text-[#8eb397]">
            {cardInfo.meanings[0].partOfSpeech}
          </div>
        </div>
      </div>
      <div className="max-w-[50%] w-full">
        <img
          src={cardInfo.images}
          alt="img-word"
          className="h-full w-full object-cover rounded-r-xl"
        />
      </div>
    </div>
  );
};

export default CardBack;
