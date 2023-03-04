import React from "react";
import { UserGroupIcon, FolderOpenIcon } from "@heroicons/react/24/outline";
import useCopy from "../../../hooks/useCopy";

const ClassInforLayout = ({
  hostName,
  hostEmail,
  hostAvatar,
  setNum,
  memberNum,
  forlderNum,
}) => {
  const invitationLink = window.location.href;
  const { isCopy, modelRef, copyInputValue } = useCopy();
  return (
    <div className="flex flex-col pl-4">
      <div>
        <p className="uppercase pt-10 text-[14px] tracking-[1px] font-semibold">
          Invitation link
        </p>
        <div>
          <input
            type="text"
            className="border-[2px] border-black rounded-md px-[12px] py-[6px]"
            value={invitationLink}
            readOnly
            ref={modelRef}
          />
          <button
            type="submit"
            className={`mt-[8px] text-[16px] text-white font-medium ml-[18px] px-[18px] py-[8px] bg-[#9ecbab] rounded-[0.25rem] transition duration-100ms ease-in ${
              isCopy ? "bg-[#9ecbab]" : "bg-[#595D6A] hover:bg-[#505462]"
            }`}
            onClick={copyInputValue}
          >
            {isCopy ? "Copy" : "Copied"}
          </button>
        </div>
      </div>
      <div>
        <p className="uppercase pt-5 text-[14px] tracking-[1px] font-semibold">
          Created By
        </p>
        <div className="flex items-center w-full border-b-[1px] border-[#EDEFF4] px-[20px] py-[15px]">
          <img
            src={hostAvatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
          <div className="ml-[10px] max-w-[120px] text-[12px]">
            <p className="font-semibold">{hostName}</p>
            <p className="font-normal">{hostEmail}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="uppercase pt-5 text-[14px] tracking-[1px] font-semibold">
          Class Details
        </p>
        <ul>
          <li className="flex mt-2 items-center">
            <div className="mr-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#d9dde8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <p className="font-semibold text-[14px]">{`${setNum} sets`}</p>
          </li>
          <li className="flex mt-2 items-center">
            <div className="mr-[8px]">
              <UserGroupIcon className="h-6 w-6 text-[#d9dde8]" />
            </div>
            <p className="font-semibold text-[14px]">{`${memberNum} members`}</p>
          </li>
          <li className="flex mt-2 items-center">
            <div className="mr-[8px]">
              <FolderOpenIcon className="w-6 h-6 text-[#d9dde8]" />
            </div>
            <p className="font-semibold text-[14px]">{`${forlderNum} folders`}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClassInforLayout;
