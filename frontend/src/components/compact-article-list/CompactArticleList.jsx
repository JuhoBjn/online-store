import { Link, useNavigate } from "react-router-dom";

import Button from "../button/Button";

import "./CompactArticleList.css";

const CompactArticleList = ({ articles }) => {
  const navigate = useNavigate();

  if (!articles || articles.length === 0) {
    return <h3 data-testid="no-articles-found">No articles found</h3>;
  }

  const listItemClickHandler = () => {
    document.getElementById("compact-article-link").click();
  };

  const editButtonHandler = (articleId) => {
    navigate(`/caretaker/news/${articleId}/edit`);
  };

  return (
    <ul data-testid="compact-article-list" className="compact-article-list">
      {articles.map((article) => (
        <li
          data-testid="compact-article-list-item"
          className="compact-article-list-item"
          key={article.id}
          onClick={listItemClickHandler}
        >
          <Link
            id="compact-article-link"
            className="compact-article-link"
            to={`/news/article/${article.id}`}
          >
            {article.headline}
          </Link>
          <Button
            testId="edit-article-button"
            type="action"
            onClick={() => editButtonHandler(article.id)}
          >
            Edit
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default CompactArticleList;
