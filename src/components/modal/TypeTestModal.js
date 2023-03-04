import React from "react";

import Essay from "../layout/sets/Essay";
import MultipleChoice from "../layout/sets/MultipleChoice";

const TypeTestModal = ({ questionMulty, questionEssay }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-[20px]">
        <MultipleChoice questionMulty={questionMulty}></MultipleChoice>
        <Essay questionEssay={questionEssay}></Essay>
      </div>
    </>
  );
};

export default TypeTestModal;
