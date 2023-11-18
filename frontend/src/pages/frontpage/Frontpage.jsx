import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";

import "./Frontpage.css";

const Frontpage = () => {
  const navigate = useNavigate();

  const navigateToAuthHandler = () => {
    navigate("/auth");
  };

  return (
    <div className="frontpage">
      <div className="frontpage-content">
        <h2 id="frontpage-title">What is GoldenAge?</h2>
        <p>
          GoldenAge is more than a community; it's a celebration of life's
          richness and the pursuit of vibrant connections. We are a dedicated
          platform designed to enhance the lives of seniors through a diverse
          array of engaging activities, cultural experiences, and supportive
          connections.
        </p>
      </div>
      <Button id="join-button" type="confirm" onClick={navigateToAuthHandler}>
        Join
      </Button>
    </div>
  );
};

export default Frontpage;
