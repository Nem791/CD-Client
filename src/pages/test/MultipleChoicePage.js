import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import TestHeader from "../../components/common/TestHeader";
import TestContentMultiple from "../../components/layout/test/TestContentMultiple";
import { getTestInfo } from "../../store/test/testSlice";

const MultipleChoicePage = () => {
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
    window.history.forward();
  }, [dispatch, testId]);
  return (
    <div onLoad={noBack}>
      <TestHeader testKind="Multiple Choice"></TestHeader>
      <TestContentMultiple></TestContentMultiple>
    </div>
  );
};

export default MultipleChoicePage;
