import React from "react";
import { useSelector } from "react-redux";
import SubCard from "../../card/SubCard";

const StillLearning = () => {
  const { cardList } = useSelector((state) => state.card);
  const cardStudied = cardList.filter((el) => el.isLearned === true);

  return (
    <>
      <div className="mt-[28px] text-[#f08700] text-[18px] font-bold">
        Still learning ({`${cardStudied?.length}`})
      </div>
      <p className="text-[16px] font-normal mt-[8px]">
        You've begun learning these terms. Keep up the good work!
      </p>
      <div className="mt-[20px] grid gap-y-[10px]">
        {cardStudied?.map((subcard) => (
          <SubCard key={subcard._id} subcard={subcard}></SubCard>
        ))}
      </div>
    </>
  );
};

export default StillLearning;
