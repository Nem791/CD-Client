import { Rating } from "@mui/material";
import React, { useState } from "react";
// import Rating from "../layout/rating/Rating";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { ButtonSubmit } from "../button";

const ReviewModal = () => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col items-center">
      <p className="text-[#939bb4] text-[14px] font-semibold tracking-wider mb-[18px]">
        RATE BY SELECTING THE NUMBER OF STARS
      </p>

      <Rating
        icon={<StarRoundedIcon sx={{ fontSize: 28 }} />}
        emptyIcon={<StarBorderRoundedIcon sx={{ fontSize: 28 }} />}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      <p className="text-[#939bb4] text-[14px] font-semibold tracking-wider mt-[18px]">
        WRITE YOUR REVIEW
      </p>

      <textarea
        className="p-4 resize-none border-[1px] max-w-[320px] w-full rounded-lg mt-[12px] outline-none"
        placeholder="Write your review..."
      ></textarea>
      <ButtonSubmit type="submit" className="font-bold max-w-[320px] w-full">
        Send Review
      </ButtonSubmit>
    </div>
  );
};

export default ReviewModal;
