import React, { useContext } from "react";
import { ModalProps } from "./Modal.model";
import Button from "../Button/Button";
import BackDrop from "../BackDrop/BackDrop";
import { createPortal } from "react-dom";
import { LanguageContext } from "../../../contexts/LanguageContext";

const ModalOverlay = (props: ModalProps) => {
  const dir = useContext(LanguageContext);
  let size;
  switch (props.size) {
    case "big":
      size = "max-w-6xl";
      break;
    case "medium":
      size = "max-w-3xl";
      break;
    case "small":
      size = "max-w-sm";
      break;
    default:
      size = "max-w-3xl";
  }

  let content = (
    <>
      <div
        className="justify-center items-center flex fixed inset-0 z-40 outline-none focus:outline-none p-1 mb-12"
        dir={dir.isRTL ? "rtl" : "ltr"}
      >
        <div className={`relative w-auto my-6 mx-auto ${size}`}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            {props.modalTitle && props.setShow && (
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">{props.modalTitle}</h3>
                <Button
                  className="p-1 rtl:mr-auto ltr:ml-auto bg-transparent border-0 text-black opacity-5 ltr:float-right rtl:float-left text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.setShow!(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </Button>
              </div>
            )}
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="my-4 text-gray-600 text-lg leading-relaxed overflow-auto">
                {props.content}
              </div>
            </div>
            {/*footer*/}
            {(props.confirmText || props.cancelText) && (
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                {dir.isRTL ? (
                  <>
                    <Button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      onClick={props.onConfirmClick}
                      type="submit"
                      form={props.confirmButtonForm}
                    >
                      {props.confirmText}
                    </Button>
                    <Button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      onClick={() => props.setShow!(false)}
                    >
                      {props.cancelText}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      onClick={() => props.setShow!(false)}
                    >
                      {props.cancelText}
                    </Button>
                    <Button
                      className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      onClick={props.onConfirmClick}
                      type="submit"
                      form={props.confirmButtonForm}
                    >
                      {props.confirmText}
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
  return createPortal(content, document.getElementById("modal-hook")!);
};

const Modal = (props: ModalProps) => {
  return (
    <>
      <BackDrop />
      <ModalOverlay {...props} />
    </>
  );
};

export default Modal;
