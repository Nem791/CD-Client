import React from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";
const Meaning = ({ meanWord }) => {
  return (
    <div className="p-2 w-full flex">
      <div className="w-[10%]">
        <BookOpenIcon className="w-5 h-5 text-[#586380]"></BookOpenIcon>
      </div>
      <div className="w-[90%]">
        <div className="text-[15px] font-semibold text-justify text-[#303545]">
          {meanWord.definition}
        </div>
        <div className="flex item-start mt-[20px]">
          <p className="text-[#939bb4] italic text-[16px] mr-[10px] max-w-[83px] w-full">
            Example
          </p>
          <p className="text-[16px]">{meanWord.example}</p>
        </div>
        <div className="flex items-start mt-[8px]">
          <p className="text-[#90b498] italic text-[16px] mr-[10px] max-w-[83px] w-full">
            Synonyms
          </p>
          <p className="text-[16px]">{meanWord.synonyms.join(", ")}</p>
        </div>
        <div className="flex items-start mt-[8px]">
          <p className="text-[#ff715b] italic text-[16px] mr-[10px] max-w-[83px] w-full">
            Antonyms
          </p>
          <p className="text-[16px]">{meanWord.antonyms.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Meaning;
