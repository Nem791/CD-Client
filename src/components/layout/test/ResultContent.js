import React from "react";
import ButtonSubmit from "../../button/ButtonSubmit";
import ResultAnswer from "./ResultAnswer";
import ResultHeader from "./ResultHeader";
import AnswerUserItem from "./AnswerUserItem";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ResultContent = () => {
  const { results } = useSelector((state) => state.results);
  const navigate = useNavigate();
  const { setId } = useParams();

  const goToSetPage = () => {
    navigate(`/set/${setId}`);
  };

  return (
    <div className="pt-[64px] bg-[#f6f7fb]">
      <ResultHeader></ResultHeader>
      <ResultAnswer>
        {results?.userAnswers?.map((rs, index) => (
          <AnswerUserItem key={index} result={rs}></AnswerUserItem>
        ))}
        <ButtonSubmit className="max-w-[700px]" onClick={goToSetPage}>
          Go back to Set
        </ButtonSubmit>
      </ResultAnswer>
    </div>
  );
};

export default ResultContent;
