import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const SetItem = () => {
  return (
    <div className="w-[240px] h-[340px] bg-[#eff5f2] rounded-lg flex flex-col items-center justify-center relative cursor-pointer">
      <div>
        <img
          src="https://images.unsplash.com/photo-1670239510546-5a59f3039d86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="img-set"
          className="w-[200px] h-[220px] object-cover rounded-lg"
        />
      </div>
      <div className="text-center max-w-[180px] ">
        <p className="text-[18px] font-semibold mt-[20px] text-short2">
          Vocabuldary Food
        </p>
        <p className="mt-[8px] text-[#bbc1cd]">Vocabuldary Food</p>
      </div>
      <div className="absolute top-[-20px] left-[-20px]">
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={70}
            className="bg-[#eff5e1] rounded-full shadow-thin"
            color="success"
            style={{ color: "#9eb8ac" }}
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
              <span className="font-bold text-[16px]">20%</span>
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default SetItem;
