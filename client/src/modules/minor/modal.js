import React, { useRef } from "react";

import ModalHeader from "./modalheader";

import "../styles/base.css";

export default function Modal({ title, component, subtitle }) {
  const modalRef = useRef(null);

  const handleDrag = (movementX, movementY) => {
    const modal = modalRef.current;
    if (!modal) return;

    const { x, y } = modal.getBoundingClientRect();
    let widthMultiplier = modalRef.current.clientWidth/1600 + 1.4;
    let heightMultiplier = modalRef.current.clientHeight/1600 + 1.4;

    modal.style.left = `${x + movementX*heightMultiplier}px`;
    modal.style.top = `${y + movementY*widthMultiplier}px`;

  };

  return (
    <div className="modal" ref={modalRef}>
      <ModalHeader onDrag={handleDrag} title={title} subtitle={subtitle} />
      <div>{component}</div>
    </div>
  );
}
