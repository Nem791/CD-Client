import React from "react";

import TestNumberQuestion from "./TestNumberQuestion";
import TestQuestionList from "./TestQuestionList";

const TestContentMultiple = () => {
  return (
    <div className="p-[64px] bg-[#f6f7fb]">
      <div className="mt-12 flex items-stretch">
        <TestNumberQuestion></TestNumberQuestion>
        <TestQuestionList></TestQuestionList>
      </div>
    </div>
  );
};

export default TestContentMultiple;
