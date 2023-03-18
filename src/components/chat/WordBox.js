import React, { useEffect, useRef } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const WordBox = () => {
  const speakRef = useRef("");
  const playAudio = useRef({});
  const speakDom = speakRef.current;
  const { vocabularyChat } = useSelector((state) => state.chat);

  const definitionList = vocabularyChat?.word
    ? vocabularyChat?.word[0]?.meanings?.flatMap((item) =>
        item?.definitions?.map((def) => def.definition)
      )
    : [];

  const exampleList = vocabularyChat?.word
    ? vocabularyChat?.word[0]?.meanings?.flatMap((item) =>
        item?.definitions?.map((def) => def?.example)
      )
    : [];

  const exampleListRemoveUndefined = exampleList?.filter(
    (val) => val !== undefined
  );

  playAudio.current = () => {
    let audio = vocabularyChat?.word[0]?.phonetics?.filter(
      (phonetic) => phonetic.audio
    )[0]?.audio;

    if (audio) {
      const audioObj = new Audio(audio);
      audioObj.play();
    }
  };

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

  return (
    <div>
      <div className="p-8 overflow-y-auto max-h-[580px]">
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="font-bold text-[24px] max-w-[100px]">
              {vocabularyChat?.word ? vocabularyChat?.word[0]?.word : ""}
            </div>
            <div className="text-[#bebebe] text-[14px] mt-[10px]">
              {vocabularyChat?.word ? vocabularyChat?.word[0]?.phonetic : ""}
            </div>
          </div>
          <div
            className="hover:bg-[#eff5f2] border-[1px] rounded-lg p-5 inline-block cursor-pointer"
            ref={speakRef}
          >
            <SpeakerWaveIcon className="w-6 h-6 text-[#9eb8ac]"></SpeakerWaveIcon>
          </div>
        </div>
        <div className="mt-8 font-semibold text-[15px]">Means</div>
        {definitionList?.map((mean, index) => {
          return (
            <div
              className="max-w-[230px] w-full"
              key={index}
            >{`- ${mean}`}</div>
          );
        })}
        <div className="mt-8 font-semibold text-[15px]">Examples</div>
        {exampleListRemoveUndefined?.map((mean, index) => {
          return (
            <div
              className="max-w-[230px] w-full"
              key={index}
            >{`- ${mean}`}</div>
          );
        })}
      </div>
    </div>
  );
};

export default WordBox;
