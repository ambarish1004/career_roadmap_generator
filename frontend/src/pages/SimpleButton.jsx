import React from "react";
import "../components/simpleButton.css";

const SimpleButton = ({ children }) => {
  return <button className="simple-button">{children}</button>;
};

export default SimpleButton;
