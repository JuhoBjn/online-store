import ReactDOM from "react-dom";

import "./TransparentOverlay.css";

const TransparentOverlay = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div className="transparent-overlay" onClick={onClick} />,
    document.getElementById("overlay-hook")
  );
};

export default TransparentOverlay;
