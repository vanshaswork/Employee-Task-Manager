// src/others/Modal.jsx
import React from "react";
import { useModal } from "../../context/ModalContext"; // adjust path as needed

const Modal = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen backdrop-blur-sm bg-black/30 z-40" >
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2   rounded-xl bg-white shadow-xl p-4">
        <div className="flex justify-end">
        </div>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;
