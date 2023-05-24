import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import setIcon from "../../../assets/img/profile/set.png";
import SetItem from "./SetItem";
import CheckIcon from "@mui/icons-material/Check";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const MySet = () => {
  const { userId } = useParams();
  const [questions, setQuestions] = useState();
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://word-up.fly.dev/api/v1/sets/get-all-sets/${userId}`
        );
        setQuestions(res.data.data.sets);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId]);

  return (
    <div>
      <div>
        <div className="flex items-center">
          <p className="font-semibold text-[24px]">Explore Your Set</p>
          <img
            src={setIcon}
            alt="hand-icon"
            className="ml-[14px] w-[32px] h-[32px]"
          />
        </div>
        <div className="text-[#b6b9c1] text-[16px] mt-[5px]">
          Let's learn something new today!
        </div>
        <div className="text-[#020202] text-[16px] mt-[5px]">
          <CheckIcon />: Approved Sets
          <br />
          <PendingActionsIcon />: Waiting for approval by admin
        </div>
      </div>
      <div className="mt-[20px]">
        <p className="mb-[20px] font-bold text-[18px]">Average Score</p>
      </div>
      <div className="mt-[40px] grid grid-cols-3 gap-x-[18px] gap-y-[32px]">
        {questions?.map((item) => {
          const { name, description, approved, image } = item;
          return <SetItem {...item} />;
        })}
      </div>
    </div>
  );
};

export default MySet;
