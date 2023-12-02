import { useNavigate } from "react-router-dom";

import Button from "../button/Button";

import "./CaretakerSidebar.css";

const CaretakerSidebar = () => {
  const navigate = useNavigate();

  const openNewArticleForm = () => {
    console.log("Navigate to create new article page");
    navigate("/caretaker/news/new-article");
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
    </aside>
  );
};

export default CaretakerSidebar;
