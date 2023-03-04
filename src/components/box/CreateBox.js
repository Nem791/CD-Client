import React from "react";
import {
  AcademicCapIcon,
  ArchiveBoxIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const CreateBox = ({ showBox, isLogin, handleShowModel }) => {
  return (
    <>
      <div
        className={`box absolute text-[#2e3856] bg-white top-10 left-0 shadow-card rounded-[8px] w-[150px] overflow-hidden  ${
          showBox ? "visible" : "invisible"
        }`}
      >
        <div className="text-[14px] font-semibold">
          <div
            className="px-5 py-[12px] hover:text-[#ffcd1f] transition ease-in duration-100ms cursor-pointer flex items-center justify-start"
            onClick={isLogin ? handleShowModel : undefined}
          >
            <AcademicCapIcon
              className="w-5 h-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
            ></AcademicCapIcon>
            <span className="ml-[4px]">Class</span>
          </div>
          <div className="px-5 py-[12px] hover:text-[#ffcd1f] transition ease-in duration-100ms cursor-pointer flex items-center justify-start">
            <DocumentTextIcon
              className="w-5 h-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
            ></DocumentTextIcon>
            <span className="ml-[4px]">Set</span>
          </div>
          <div className="px-5 py-[12px] hover:text-[#ffcd1f] transition ease-in duration-100ms cursor-pointer flex items-center justify-start">
            <ArchiveBoxIcon
              className="w-5 h-5"
              viewBox="0 0 24 24"
              strokeWidth="2"
            ></ArchiveBoxIcon>

            <span className="ml-[4px]">Folder</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBox;
