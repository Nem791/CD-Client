import React from "react";
import { motion } from "framer-motion";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Button, Divider } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import axios from "axios";
import { store } from "../../../store/configureStore";

const PlanItems = ({ isPopular = false, type, setIsModalOpening }) => {
  const info = {
    basic: {
      message: "Basic",
      price: 1000,
      info: ["Get started with messaging"],
    },
    pro: {
      message: "Pro",
      price: 1500,
    },
    enterprise: {
      message: "Enterprise",
      price: 2000,
    },
  };
  const userId = store.getState().auth.user?._id;

  const payLearningPlan = async () => {
    const planInfo = info[type];
    try {
      const res = await axios.post(
        `https://wordupset.fly.dev/api/v1/transaction`,
        {
          unit_amount: planInfo.price,
          name: planInfo.message,
          user: userId,
        }
      );
      const link = res.data.data.transaction;
      //console.log(res)
      window.location.href = link;
      // setIsModalOpening(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`relative border-[2px] w-[300px] h-[320px] rounded-lg shadow-flashcard cursor-pointer p-5 ${
        isPopular ? "bg-[#1a1c29]" : ""
      }`}
      onClick={payLearningPlan}
    >
      <div className="flex gap-4">
        <div
          className={`w-[70px] h-[70px] ${
            isPopular ? "bg-[#ffcd1f]" : "bg-primary"
          } flex justify-center items-center rounded-lg`}
        >
          {type === "basic" ? (
            <SchoolRoundedIcon
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
          ) : type === "pro" ? (
            <RocketLaunchRoundedIcon
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
          ) : type === "enterprise" ? (
            <LightbulbRoundedIcon
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
          ) : (
            <LightbulbRoundedIcon
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
          )}
        </div>
        <div>
          <div
            className={`font-semibold text-[20px] flex gap-2 items-center ${
              isPopular ? "text-white" : ""
            }`}
          >
            <div>{info[type].message ?? ""}</div>
          </div>
          <div className={`mt-[18px] gap-1 ${isPopular ? "text-white" : ""}`}>
            <span className="align-top leading-[10px] text-[18px]">$</span>
            <span className="font-semibold text-[40px]">
              {info[type].price}
            </span>{" "}
            <spam className="text-[#a6aab4]">/ Month</spam>
          </div>
        </div>
      </div>
      <Divider
        style={{
          marginTop: "20px",
        }}
      />
      <div className="mt-[10px] p-[10px] flex flex-col gap-[7px] flex-grow">
        <div className="flex items-center gap-[8px]">
          <CheckRoundedIcon
            style={{
              color: "#a6aab4",
            }}
          />
          <span className="text-[#a6aab4]">
            Get started with{" "}
            <strong className="text-[#303545]">messaging</strong>
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <CheckRoundedIcon
            style={{
              color: "#a6aab4",
            }}
          />
          <span className="text-[#a6aab4]">
            Get started with{" "}
            <strong className="text-[#303545]">messaging</strong>
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <CheckRoundedIcon
            style={{
              color: "#a6aab4",
            }}
          />
          <span className="text-[#a6aab4]">
            Get started with{" "}
            <strong className="text-[#303545]">messaging</strong>
          </span>
        </div>
        <Button
          variant="contained"
          disableElevation={true}
          disableRipple={true}
          style={{
            marginTop: "30px",
            backgroundColor: `${isPopular ? "#ffcd1f" : "#ffbd64"}`,
            textTransform: "none",
            fontFamily: "Poppins",
            letterSpacing: "2px",
          }}
        >
          Choose plan <NavigateNextRoundedIcon style={{ fontSize: "20px" }} />
        </Button>
        <div></div>
      </div>
      {isPopular && (
        <div className="absolute  py-[4px] px-[8px]  rounded-lg text-white bg-[#ffcd1f] top-[14px] text-[12px] right-[14px]">
          Popular
        </div>
      )}
    </motion.div>
  );
};

export default PlanItems;
