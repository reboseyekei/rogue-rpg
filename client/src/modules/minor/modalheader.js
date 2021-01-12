import React, { useState, useEffect } from "react";

import "../styles/base.css";

export default function ModalHeader({ onDrag, title, subtitle }) {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => onDrag(e.movementX, e.movementY);

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  return (
    <div className="modal__header" onMouseDown={handleMouseDown} style={{ cursor: "grab", userSelect: "none" }}>
      <h1 className="header">{title}</h1>
      {subtitle}
    </div>
  );
}
