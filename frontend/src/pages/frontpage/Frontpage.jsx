import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../components/button/Button";
import FrontpageBanner from "../../assets/Frontpage_banner.jpg";

import "./Frontpage.css";

const Frontpage = () => {
  const navigate = useNavigate();

  const navigateToSignupHandler = () => {
    navigate("/auth#signup");
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
      <div className="frontpage-banner-container">
        <img
          className="frontpage-banner-image"
          data-testid="frontpage-banner-image"
          src={FrontpageBanner}
          alt="Banner image of a painting workshop"
        />
      </div>
      <div className="frontpage-content">
        <h1 data-testid="frontpage-title" id="frontpage-title">
          What is GoldenAge?
        </h1>
        <p data-testid="frontpage-content">
          GoldenAge is more than a community; it&apos;s a celebration of
          life&apos;s richness and the pursuit of vibrant connections. We are a
          dedicated platform designed to enhance the lives of seniors through a
          diverse array of engaging activities, cultural experiences, and
          supportive connections.
        </p>
        <p
          id="frontpage-content-pricing"
          data-testid="frontpage-content-pricing"
        >
          Join us now and try it 30 days for free <br />
          (after trial 14.99€/month)
        </p>
        <Button
          id="join-button"
          data-testid="join-button"
          type="confirm"
          onClick={navigateToSignupHandler}
        >
          Join
        </Button>
      </div>
    </div>
  );
};

export default Frontpage;
