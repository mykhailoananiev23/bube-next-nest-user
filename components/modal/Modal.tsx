import React from "react";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

export default function Modal({ children, visible, onClose }: ModalProps) {
  const handleOnBackDropClick = (e: any) => {
    if (e.target.id === "backdrop") onClose && onClose();
  };

  return (
    <div
      id="backdrop"
      onClick={handleOnBackDropClick}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
        {children}
    </div>
  );
}
