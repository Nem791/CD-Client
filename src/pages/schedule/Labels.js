import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLabels } from "../../store/schedule/scheduleSlice";

const Labels = () => {
  const { labels } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const updateLabel = (label) => {
    dispatch(
      setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)))
    );
  };
  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </>
  );
};

export default Labels;
