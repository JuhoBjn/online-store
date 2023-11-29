import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

import timeFormat from "../../utils/timeFormat";

import "./NewsArticlePage.css";

const NewsArticlePage = () => {
  const [article] = useState(useLoaderData());

  return (
    <div className="news-article-page">
      <article className="news-page-article-container">
        <div className="news-page-article-image-container">
          <img
            src={article.imageUrl}
            alt={`Article picture: ${article.headline}`}
          />
        </div>
        <div className="news-page-article-header">
          <h1>{article.headline}</h1>
          <div className="news-page-article-header-dates">
            {article.createdAt && (
              <p>Posted: {timeFormat(article.createdAt)}</p>
            )}
            {article.updatedAt !== article.createdAt && (
              <p>Updated: {timeFormat(article.updatedAt)}</p>
            )}
          </div>
        </div>
        <div className="news-page-article-body">
          <p>{article.body}</p>
        </div>
        <div className="news-page-article-link-container">
          <Link to={article.link}>Follow article link</Link>
        </div>
      </article>
    </div>
  );
};

export default NewsArticlePage;
