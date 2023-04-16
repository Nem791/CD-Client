import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCardList } from "../../../store/card/slice";
import CheckIcon from "@mui/icons-material/Check";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const SetItem = (props) => {
  console.log("props", props);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCardList(props._id));
  }, [dispatch, props?._id]);

  const navigateToSetPage = () => {
    navigate(`/set/${props?._id}`);
  };
  return (
    <div
      className="w-[240px] h-[340px] bg-[#fff2e2] rounded-lg flex flex-col items-center justify-center relative cursor-pointer"
      onClick={navigateToSetPage}
    >
      <div>
        <img
          src={props.image}
          alt="img-set"
          className="w-[200px] h-[220px] object-cover rounded-lg"
        />
      </div>
      <div className="text-center max-w-[180px] ">
        <p className="text-[18px] font-semibold mt-[20px] text-short2">
          {props.name}
        </p>
        <p className="mt-[8px] text-[#bbc1cd]">{props.description}</p>
      </div>
      <div className="absolute top-[-20px] left-[-20px]">
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={(0.5 * 100).toFixed(1)}
            className="bg-[#ffd884] rounded-full shadow-thin"
            color="success"
            style={{ color: "#eaa334" }}
            size={50}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" component="div">
              <span className="font-bold text-[16px]">
                {props.approved ? <CheckIcon /> : <PendingActionsIcon />}
              </span>
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SetItem;
