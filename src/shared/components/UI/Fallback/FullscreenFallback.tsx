import React from "react";
import { MoonLoader } from "react-spinners";
import { createPortal } from "react-dom";

const FullscreenFallback = () => {
  return (
    <div>
      {createPortal(
        <div className="flex justify-center align-middle fixed h-screen w-full bg-white z-50">
          <div className="mx-auto my-auto ">
            <MoonLoader color="gray" size="64px" />
          </div>
        </div>,
        document.getElementById("loading-hook")!
      )}
    </div>
  );
};

export default FullscreenFallback;
