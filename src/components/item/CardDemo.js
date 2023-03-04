import React from "react";
import useGetImageUrl from "../../hooks/useGetImageUrl";

const CardDemo = ({ setId, card, index, deleteCard = () => {} }) => {
  const handleDeleteCard = () => {
    deleteCard({ cardId: card._id, setId });
  };
  return (
    <div className="bg-white rounded-[0.8rem] cursor-pointer relative">
      <div className="py-[18px] px-[30px] border-b-[2px] border-[#f6f7fb] solid flex items-cemter justify-between">
        <span className="text-[#939bb4] w-[2.5rem] text-[16px] font-bold ">
          {index + 1}
        </span>
        <div onClick={handleDeleteCard}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-[#939bb4] hover:text-[#fe6232]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
      <div className="px-[12px] pt-[12px] pb-[24px] flex items-center">
        <div className="w-2/4 pt-[12px] pl-[12px] pl-[20px]">
          <div className="text-[18px] text-[#303545]">{card.word}</div>
          <div className="shadow-word h-[0.25rem]"></div>
          <div className="mt-2 text-[#939bb4] text-[0.75rem] font-semibold tracking-[0.0625rem]">
            TERM
          </div>
        </div>
        <div className="w-2/4 pt-[12px] pl-[12px] pl-[20px] pr-[20px] flex">
          <div className="w-[90%]">
            <div className="text-[18px] text-[#303545]">
              {card.meaningUsers}
            </div>
            <div className="shadow-word h-[0.25rem]"></div>
            <div className="mt-2 text-[#939bb4] text-[0.75rem] font-semibold tracking-[0.0625rem]">
              DEFINITION
            </div>
          </div>
          <label htmlFor="card" className="cursor-pointer">
            <img
              src={`${card.images}`}
              alt="img"
              className="w-[65px] h-[56px] ml-[10px] object-cover rounded-xl"
            />
          </label>
          {/* {imageCover && (
            <>
              <label
                htmlFor="card"
                className="w-full cursor-pointer ml-[10px] w-[70px] border-[2px] border-[#d9dde8] border-dashed flex items-center justify-center flex-col"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-[#ffcd1f] transition all linear"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <div className="text-[#303545] text-[10px]">IMAGE</div>
              </label>
            </>
          )}
          <input
            type="file"
            id="card"
            className="hidden"
            onChange={getImageUrl}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default CardDemo;
