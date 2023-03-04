import React from "react";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const Rating = () => {
  return (
    <div className="">
      <div className="">
        <StarBorderRoundedIcon></StarBorderRoundedIcon>
        <StarBorderRoundedIcon></StarBorderRoundedIcon>
        <StarBorderRoundedIcon></StarBorderRoundedIcon>
        <StarBorderRoundedIcon></StarBorderRoundedIcon>
        <StarBorderRoundedIcon></StarBorderRoundedIcon>

        {/* <div className="star-1">
          <StarRoundedIcon></StarRoundedIcon>
          <StarRoundedIcon></StarRoundedIcon>
          <StarRoundedIcon></StarRoundedIcon>
          <StarRoundedIcon></StarRoundedIcon>
          <StarRoundedIcon></StarRoundedIcon>
        </div> */}
      </div>
    </div>
  );
};

export default Rating;
