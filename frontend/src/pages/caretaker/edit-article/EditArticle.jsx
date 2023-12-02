import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import "./EditArticle.css";

const EditArticle = () => {
  const [article, setArticle] = useState(useLoaderData());

  useEffect(() => {
    console.log(article);
  }, [article]);

  return (
    <div className="edit-article-page">
      <h1>Edit news article page</h1>
    </div>
  );
};

export default EditArticle;
