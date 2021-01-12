import React, { useRef } from "react";

import ModalHeader from "./modalheader";

import "../styles/base.css";

export default function Modal({ title, component, subtitle }) {
  const modalRef = useRef(null);

  const handleDrag = (movementX, movementY) => {
    const modal = modalRef.current;
    if (!modal) return;

    const { x, y } = modal.getBoundingClientRect();

    modal.style.left = `${x + movementX / 2}px`;
    modal.style.top = `${y + movementY / 2}px`;
  };

  return (
    <div className="modal" ref={modalRef}>
      <ModalHeader onDrag={handleDrag} title={title} subtitle={subtitle} />
      <div>{component}</div>
    </div>
  );
}
