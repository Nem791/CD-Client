import React, { useState } from "react";

import Collapsible from "react-collapsible";
import AccordionHeading from "../../accordion/AccordionHeading";
import Meaning from "./Meaning";

const PartOfSpeech = ({ mean }) => {
  const [show, setShow] = useState(false);
  const handleOpenAccordion = () => {
    setShow(true);
  };
  const handleCloseAccordion = () => {
    setShow(false);
  };

  return (
    <>
      {/* AccordionHeading */}
      <Collapsible
        trigger={<AccordionHeading show={show} mean={mean}></AccordionHeading>}
        onTriggerOpening={handleOpenAccordion}
        onTriggerClosing={handleCloseAccordion}
      >
        {/* AccordionContent */}
        <div className="overflow-hidden transition-all duration-500 ease-in-out mt-[10px] bg-white p-[20px] rounded-xl">
          {mean?.definitions?.map((meanWord, index) => {
            if (index < 3) {
              return <Meaning meanWord={meanWord} key={meanWord._id}></Meaning>;
            } else {
              return <div key={meanWord._id}></div>;
            }
          })}
        </div>
      </Collapsible>
    </>
  );
};

export default PartOfSpeech;
