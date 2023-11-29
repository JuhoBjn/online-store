import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import NewsList from "../../components/news/NewsList";

import "./News.css";

const News = () => {
  const [news] = useState(useLoaderData());

  return (
    <div className="news-page">
      <div className="news-page-articles-container">
        <NewsList articles={news} />
      </div>
    </div>
  );
};

export default News;
