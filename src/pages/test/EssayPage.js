import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import TestHeader from "../../components/common/TestHeader";
import TestContentEssay from "../../components/layout/test/TestContentEssay";
import { getTestInfo } from "../../store/test/testSlice";

const EssayPage = () => {
  const { testId } = useParams();
  const dispatch = useDispatch();

  function noBack() {
    window.history.forward();
  }
  useEffect(() => {
    window.history.forward();
  });

  useEffect(() => {
    dispatch(getTestInfo(testId));
  }, [dispatch, testId]);
  return (
    <div onLoad={noBack}>
      <TestHeader testKind="Essay"></TestHeader>
      <TestContentEssay></TestContentEssay>
    </div>
  );
};

export default EssayPage;
