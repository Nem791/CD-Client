import React from "react";

const CardDemo = ({ setId, card, index, deleteCard = () => {} }) => {
  const handleDeleteCard = () => {
    deleteCard({ cardId: card._id, setId });
  };

  console.log("cardNam", card);
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
        <div className="w-full">
          <div className="w-[90%] pt-[12px] pl-[20px]">
            <div className="text-[18px] text-[#303545]">{card.word}</div>
            <div className="shadow-word h-[0.25rem] w-full"></div>
            <div className="mt-2 text-[#939bb4] text-[0.75rem] font-semibold tracking-[0.0625rem]">
              TERM
            </div>
          </div>
          <div className="w-[90%] pt-[12px] pl-[20px]">
            <div className="text-[18px] text-[#303545]">
              {card.meaningUsers}
            </div>
            <div className="shadow-word h-[0.25rem]"></div>
            <div className="mt-2 text-[#939bb4] text-[0.75rem] font-semibold tracking-[0.0625rem]">
              DEFINITION
            </div>
          </div>
        </div>
        <div className="w-2/4 pt-[12px] pl-[12px] pl-[20px] pr-[20px] flex">
          {card?.mimeType === "image" && (
            <label htmlFor="card" className="cursor-pointer">
              <img
                src={`${card?.fileUrl}`}
                alt="img"
                className="w-[400px] h-[225px] object-cover rounded-xl"
              />
            </label>
          )}
          {card?.mimeType === "video" && (
            <label
              htmlFor="card"
              className="cursor-pointer w-[400px] h-[225px] object-cover rounded-xl"
            >
              <video
                className="w-[400px] h-[225px] object-cover rounded-xl"
                controls
              >
                <source src={card?.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDemo;
