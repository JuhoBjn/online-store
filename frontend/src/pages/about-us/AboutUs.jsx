import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ElatedPensioner from "../../assets/Elated_pensioner.jpg";

import "./AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="about-us-page">
      <div className="about-us-page-content">
        <div
          data-testid="about-us-content-left"
          className="about-us-content-left"
        >
          <p data-testid="about-us-paragraph1">
            Welcome to GoldenAge, where we believe in making every phase of life
            vibrant, engaging, and fulfilling. We understand the challenges that
            elderly individuals face, and we&apos;re here to transform their
            lives by providing an easy and convenient platform that offers a
            myriad of activities, from lively parties to the pursuit of exciting
            new hobbies and the chance to make new friends.
          </p>
          <p data-testid="about-us-paragraph2">
            Our mission is clear: to reduce loneliness, promote an active and
            happy lifestyle, and ultimately improve the quality of life and
            mental well-being of the elderly. We are dedicated to creating a
            thriving community for the elderly, fostering connections, and
            combatting the feelings of loneliness and isolation that often
            accompany the golden years. Our platform is designed to make life in
            the golden age truly golden.
          </p>
        </div>
        <div
          data-testid="about-us-content-right"
          className="about-us-content-right"
        >
          <img
            data-testid="about-us-image"
            src={ElatedPensioner}
            alt="An elated old lady sitting on a chair pumping her arm in the air in celebration."
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
