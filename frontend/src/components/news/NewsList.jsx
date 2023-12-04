import NewsArticle from "./NewsArticle";

import "./NewsList.css";

const NewsList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <h2 data-testid="no-articles-found " className="center">
        No articles found
      </h2>
    );
  }

  return (
    <div data-testid="news-list-container" className="news-list-container">
      <ul data-testid="news-list" className="news-list">
        {articles.map((article) => (
          <li data-testid="news-list-item" key={article.id}>
            <NewsArticle
              id={article.id}
              headline={article.headline}
              body={article.body}
              imageUrl={article.image_url ?? ""}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
