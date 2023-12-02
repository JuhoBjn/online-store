import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import "./PostedArticles.css";
import CompactArticleList from "../../components/compact-article-list/CompactArticleList";

const PostedArticles = () => {
  const [articles] = useState(useLoaderData());

  return (
    <div className="posted-articles-page">
      <header data-testid="posted-articles-page-header">
        <h2 data-testid="posted-articles-page-header-title">Posted articles</h2>
      </header>
      <div
        data-testid="posted-articles-container"
        className="posted-articles-container"
      >
        <CompactArticleList articles={articles} />
      </div>
    </div>
  );
};

export default PostedArticles;
