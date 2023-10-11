import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useToggle = (element) => {
  const [openElements, setOpenElements] = useState([]);
  const navigate = useNavigate();

  const toggle = (elementId, e) => {
    if (e.target.id.includes("link")) {
      return navigate(`/${element}/${elementId}`);
    }
    if (openElements.includes(elementId)) {
      setOpenElements(openElements.filter((id) => id !== elementId));
    } else {
      setOpenElements([...openElements, elementId]);
    }
  };

  return {
    openElements,
    toggle,
  };
};
