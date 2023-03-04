import { useRef, useState } from "react";

export default function useCopy() {
  const [isCopy, setIsCopy] = useState(false);

  const modelRef = useRef(null);

  const copyInputValue = (e) => {
    e.preventDefault();
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = modelRef.current.value;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    setTimeout(() => {
      setIsCopy(true);
    }, 2000);
    setIsCopy(!isCopy);
  };

  return { isCopy, modelRef, copyInputValue };
}
