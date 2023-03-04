import React from "react";
import ReactDOM from "react-dom";
import Definition from "../layout/cardDetail/Definition";
import PartOfSpeech from "../layout/cardDetail/PartOfSpeech";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { setCardShow } from "../../store/cardDetailShow/cardDetailSlice";
import { useDispatch, useSelector } from "react-redux";

const CardDetails = ({ show = false }) => {
  const dispatch = useDispatch();

  const { cardDetail } = useSelector((state) => state.cardDetail);

  const closeCard = () => {
    dispatch(setCardShow(false));
  };
  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed w-full h-full z-40 visible opacity-100 transition ease-in duration-200 ${
          show ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.25)] z-40"></div>
        <div className="absolute z-50 p-[64px] w-full h-full flex items-start overflow-y-scroll">
          <div className="w-[65%] mr-[20px]">
            <Definition cardDetail={cardDetail}></Definition>
            {cardDetail?.meanings?.map((mean) => (
              <PartOfSpeech key={mean._id} mean={mean}></PartOfSpeech>
            ))}
          </div>
          <div className="grid grid-row-1 w-[35%]">
            <div className="bg-white p-[40px] w-full rounded-xl">
              <img
                src={cardDetail.images}
                alt="word-img"
                className="w-full h-[250px] object-cover"
              />
            </div>
            <div
              className="bg-white p-[10px] w-max rounded-xl mt-[10px] flex items-center font-bold cursor-pointer"
              onClick={closeCard}
            >
              <ReplyRoundedIcon sx={{ fontSize: 18 }}></ReplyRoundedIcon>
              <span className="leading-[24px]">Go back</span>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#root")
  );
};

export default CardDetails;
