import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../components/button/Button";

import "./Frontpage.css";

const Frontpage = () => {
  const navigate = useNavigate();

  const navigateToAuthHandler = () => {
    navigate("/auth");
  };

  // Redirect user to the news page if they're logged in.
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="frontpage">
      <div className="frontpage-content">
        <h2 data-testid="frontpage-title" id="frontpage-title">
          What is GoldenAge?
        </h2>
        <p data-testid="frontpage-content">
          GoldenAge is more than a community; it&apos;s a celebration of
          life&apos;s richness and the pursuit of vibrant connections. We are a
          dedicated platform designed to enhance the lives of seniors through a
          diverse array of engaging activities, cultural experiences, and
          supportive connections.
        </p>
      </div>
      <Button
        id="join-button"
        data-testid="join-button"
        type="confirm"
        onClick={navigateToAuthHandler}
      >
        Join
      </Button>
    </div>
  );
};

export default Frontpage;
