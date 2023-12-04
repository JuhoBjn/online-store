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
          {article.imageUrl && (
            <img
              data-testid="news-page-article-image"
              src={article.imageUrl}
              alt={`Article picture: ${article.headline}`}
            />
          )}
        </div>
        <div className="news-page-article-header">
          <h1 data-testid="news-page-article-headline">{article.headline}</h1>
          <div className="news-page-article-header-dates">
            {article.createdAt && (
              <p data-testid="news-page-article-posted-at">
                Posted: {timeFormat(article.createdAt)}
              </p>
            )}
            {article.updatedAt !== article.createdAt && (
              <p>Updated: {timeFormat(article.updatedAt)}</p>
            )}
          </div>
        </div>
        <div className="news-page-article-body">
          <p data-testid="news-page-article-body">{article.body}</p>
        </div>
        <div className="news-page-article-link-container">
          <Link data-testid="news-page-article-link" to={article.link}>
            Follow article link
          </Link>
        </div>
      </article>
    </div>
  );
};

export default NewsArticlePage;
