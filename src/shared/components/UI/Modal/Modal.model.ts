export interface ModalProps {
  content: React.ReactNode;
  cancelText?: React.ReactText;
  confirmText?: React.ReactText;
  size: "big" | "small" | "medium";
  modalTitle?: React.ReactText;
  setShow?: (isShow: boolean) => void;
  onConfirmClick?: any;
  confirmButtonForm?: string;
}

export interface IModal {
  key: string;
}
