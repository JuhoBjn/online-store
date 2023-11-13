import "./Home.css";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Events from "../../components/HomepageTopics/Events";
import Friends from "../../components/HomepageTopics/Friends";
import News from "../../components/HomepageTopics/News";
import Match from "../../components/HomepageTopics/Match";
import GoldenageLogo from "../../assets/Goldenage_logo.png";

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("News");

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const renderBody = () => {
    switch (selectedTopic) {
      case "News":
        return <News />;
      case "Match":
        return <Match />;
      case "Friends":
        return <Friends />;
      case "Events":
        return <Events />;
      default:
        return null;
    }
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__header">
          <div className="home__header-left">
            <img
              className="home__logo"
              data-testid="logo"
              src={GoldenageLogo}
              alt="Goldenage logo"
            />
            <div className="home__topics">
              <span
                className={`home__topic ${
                  selectedTopic === "News" ? "home__topic--selected" : ""
                }`}
                onClick={() => handleTopicClick("News")}
              >
                News
              </span>
              <span
                className={`home__topic ${
                  selectedTopic === "Match" ? "home__topic--selected" : ""
                }`}
                onClick={() => handleTopicClick("Match")}
              >
                Match
              </span>
              <span
                className={`home__topic ${
                  selectedTopic === "Friends" ? "home__topic--selected" : ""
                }`}
                onClick={() => handleTopicClick("Friends")}
              >
                Friends
              </span>
              <span
                className={`home__topic ${
                  selectedTopic === "Events" ? "home__topic--selected" : ""
                }`}
                onClick={() => handleTopicClick("Events")}
              >
                Events
              </span>
            </div>
          </div>
          <div className="home__header-right">
            <img
              className="home__profile-logo"
              data-testid="profile-logo"
              //src={/* path to profile logo */}
              alt="Profile"
              onClick={handleDropdownClick}
            />
            {isDropdownOpen && (
              <div className="home__dropdown">
                <ul>
                  <li>Profile Settings</li>
                  <li>Q&A</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="home__body">{renderBody()}</div>
      </div>
    </div>
  );
};

export default Home;