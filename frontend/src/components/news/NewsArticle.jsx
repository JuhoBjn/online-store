import { Link } from "react-router-dom";

import "./NewsArticle.css";

const NewsArticle = ({ id, headline, body, imageUrl }) => {
  return (
    <>
      <article
        data-testid="news-article-container"
        className="news-article-container"
      >
        <div
          className={`news-article-image-container ${
            id % 2 == 0 ? "right" : "left"
          }`}
        >
          {imageUrl && (
            <img
              data-testid="news-article-image"
              src={imageUrl}
              alt={`Article image: ${headline}`}
            />
          )}
        </div>
        <div className="news-article-content">
          <Link to={`/article/${id}`} data-testid="news-article-headline">
            {headline}
          </Link>
          <p data-testid="news-article-body">{body}</p>
        </div>
      </article>
      <hr />
    </>
  );
};

export default NewsArticle;
