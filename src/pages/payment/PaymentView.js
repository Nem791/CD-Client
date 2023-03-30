import React, { useState } from "react";
import Header from "../../components/common/Header";
import logo from "../../assets/img/home/logo.png";
import PlanItems from "./component/PlanItems";
import { Button, Modal, Typography } from "@mui/material";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  backgroundColor: "white",
};
const PaymentView = () => {
  const [isModalOpening, setIsModalOpening] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Header></Header>
      <div className="p-[64px]">
        {/* Logo and Title */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <div className="">
            <img src={logo} alt="logo" className="h-[80px]" />
          </div>
          <div>
            <p className="font-semibold text-[40px] mt-[18px]">
              Choose your plan with us!
            </p>
            <p className="mt-[30px] text-[18px] text-gray-400 tracking-widest">
              Which plan options fits you best?
            </p>
          </div>
        </div>
      </div>
      {/* Plan */}
      <div className="flex items-center justify-center gap-5">
        <PlanItems
          type="basic"
          setIsModalOpening={setIsModalOpening}
        ></PlanItems>
        <PlanItems
          isPopular
          type="pro"
          setIsModalOpening={setIsModalOpening}
        ></PlanItems>
        <PlanItems
          type="enterprise"
          setIsModalOpening={setIsModalOpening}
        ></PlanItems>
      </div>
      <Modal
        open={isModalOpening}
        onClose={() => {
          navigate("/");
          setIsModalOpening(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center italic font-mono ">
            <div className="flex justify-center pb-4">
              <CheckBadgeIcon className="w-16 h-16 text-green-500" />
            </div>
            Thank you very much for choosing us
          </div>
          <div className="py-2"></div>
          <Button
            size={"large"}
            fullWidth
            onClick={() => {
              navigate("/");
              setIsModalOpening(false);
            }}
          >
            Go Home!
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentView;
