import React from "react";
import TestEssayList from "./TestEssayList";

import TestNumberQuestion from "./TestNumberQuestion";

const TestContentEssay = () => {
  return (
    <div className="p-[64px] bg-[#f6f7fb]">
      <div className="mt-12 flex items-stretch">
        <TestNumberQuestion></TestNumberQuestion>
        <TestEssayList></TestEssayList>
      </div>
    </div>
  );
};

export default TestContentEssay;
