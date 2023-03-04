import { useEffect, useRef, useState } from "react";

export default function useClickOutSide() {
  const [showModal, setShowModal] = useState(false);

  const modelRef = useRef(null);

  useEffect(() => {
    function handleClickOutSide(e) {
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setShowModal(false);
      }
    }
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);
  return { showModal, setShowModal, modelRef };
}
