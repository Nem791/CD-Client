import React from "react";
import { motion } from "framer-motion";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";

const PlanItems = ({ isPopular = false }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`border-[2px] w-[300px] h-[400px] rounded-lg shadow-flashcard cursor-pointer p-5 ${
        isPopular ? "bg-[#8eb397]" : ""
      }`}
    >
      <div className="font-semibold text-[20px] flex gap-2 items-center">
        <LightbulbRoundedIcon />
        <div>Starter</div>
      </div>
      <div className="mt-[18px] gap-1">
        <span className="font-semibold text-[30px]">$29</span> <spam>/Mo</spam>
      </div>
    </motion.div>
  );
};

export default PlanItems;
