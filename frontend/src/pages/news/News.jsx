import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import CalendarSidebar from "../../components/calendar-sidebar/CalendarSidebar";
import NewsList from "../../components/news/NewsList";

import "./News.css";

const News = () => {
  const [data] = useState(useLoaderData());

  return (
    <div className="news-page">
      <div className="news-page-articles-container">
        <NewsList articles={data.news} />
      </div>
      <div className="calendar-container">
        <CalendarSidebar calendar={data?.eventDates ?? []} />
      </div>
    </div>
  );
};

export default News;
