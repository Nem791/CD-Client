import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import TestHeader from "../../components/common/TestHeader";
import ResultContent from "../../components/layout/test/ResultContent";
import { getResultInfo } from "../../store/results/slice";

const ResultPage = () => {
  const { testId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResultInfo(testId));
  }, [dispatch, testId]);
  return (
    <div>
      <TestHeader testKind="Result"></TestHeader>
      <ResultContent></ResultContent>
    </div>
  );
};

export default ResultPage;
