import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import Button from "../../components/button/Button";
import { AuthContext } from "../../utils/AuthContext";

import "./Frontpage.css";

const Frontpage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const navigateToAuthHandler = () => {
    navigate("/auth");
  };

  // Redirect user to the news page if they're logged in.
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      navigate("/");
    }
  }, []);

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
