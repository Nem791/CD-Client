import React from "react";
import StyleIcon from "@mui/icons-material/Style";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import { useDispatch, useSelector } from "react-redux";
import { setShowReview, setShowTestModel } from "../../../store/show/showSlice";

const SetFeature = () => {
  const dispatch = useDispatch();
  const { setInfo } = useSelector((state) => state.set);
  return (
    <div className="p-[40px] bg-white rounded-xl h-max">
      <h1 className="text-[28px] max-w-[90%] w-full font-bold tracking-[1px] leading-8">
        {setInfo.name}
      </h1>
      <div
        className="mt-[20px] flex items-center cursor-pointer"
        onClick={() => {
          dispatch(setShowReview(true));
        }}
      >
        <StarRoundedIcon className="text-[20px] text-[#ffcd1f]" />
        <p className="ml-[10px] text-[16px] text-[#586380] font-semibold">
          Leave the first rating
        </p>
      </div>
      <div className="mt-[20px]">
        <div className="p-[20px] hover:bg-[#ffcd1f] rounded-xl cursor-pointer flex items-center">
          <div>
            <StyleIcon className="text-[40px]" />
          </div>
          <h1 className="ml-[10px] font-semibold text-[16px]">Flashcards</h1>
        </div>
        <div
          className="p-[20px] hover:bg-[#ffcd1f] rounded-xl cursor-pointer flex items-center"
          onClick={() => {
            dispatch(setShowTestModel(true));
          }}
        >
          <div>
            <LocalLibraryRoundedIcon className="text-[40px]" />
          </div>
          <h1 className="ml-[10px] font-semibold text-[16px]">Learn</h1>
        </div>
      </div>
    </div>
  );
};

export default SetFeature;
