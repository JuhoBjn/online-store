import { useNavigate } from "react-router-dom";

import Button from "../button/Button";

import "./CaretakerSidebar.css";

const CaretakerSidebar = () => {
  const navigate = useNavigate();

  const openNewArticleForm = () => {
    navigate("/caretaker/news/new-article");
  };

  const openMyArticlesPage = () => {
    navigate("/caretaker/news/posted-articles");
  };

  const openNewActivityForm = () => {
    navigate("/caretaker/activities/new-activity");
  };

  const openCreatedActivities = () => {
    navigate("/caretaker/activities");
  };

  return (
    <aside
      data-testid="caretaker-sidebar-container"
      className="caretaker-sidebar-container"
    >
      <Button
        testId="new-article-button"
        type="action"
        onClick={openNewArticleForm}
      >
        + New article
      </Button>
      <Button
        testId="posted-articles-button"
        type="action"
        onClick={openMyArticlesPage}
      >
        Posted articles
      </Button>
      <Button
        testId="new-activity-button"
        type="action"
        onClick={openNewActivityForm}
      >
        + New activity
      </Button>
      <Button
        testId="created-activities-button"
        type="action"
        onClick={openCreatedActivities}
      >
        Created activities
      </Button>
    </aside>
  );
};

export default CaretakerSidebar;
