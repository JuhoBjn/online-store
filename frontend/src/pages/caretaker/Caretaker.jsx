import { Outlet } from "react-router-dom";

import CaretakerSidebar from "../../components/caretaker-sidebar/CaretakerSidebar";

import "./Caretaker.css";

const Caretaker = () => {
  return (
    <div className="caretaker-page">
      <CaretakerSidebar />
      <div className="caretaker-page-child-route-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Caretaker;
