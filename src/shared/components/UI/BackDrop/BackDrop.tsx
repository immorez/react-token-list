import React from "react";
import { createPortal } from "react-dom";

interface BackDropProps {
  onClick?: () => void;
}

const BackDrop = (props: BackDropProps) => {
  return createPortal(
    <div
      onClick={props.onClick}
      className="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default BackDrop;
