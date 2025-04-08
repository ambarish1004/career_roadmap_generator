// SimpleButton.jsx
import React from "react";
import "../components/simpleButton.css";

const SimpleButton = ({ children, onClick }) => {
  return <button className="simple-button" onClick={onClick}>{children}</button>;
};

export default SimpleButton;
