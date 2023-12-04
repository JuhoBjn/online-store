import { useEffect, useState, useRef, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import Button from "../../../components/button/Button";
import { deleteArticle, updateArticle } from "../../../utils/NewsAPI";
import { AuthContext } from "../../../utils/AuthContext";

import "./EditArticle.css";

const EditArticle = () => {
  const [article, setArticle] = useState(useLoaderData());
  const [articlePicturePreview, setArticlePicturePreview] = useState(null);
  const [actionCompleted, setActionCompleted] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const articlePicturePreviewSetRef = useRef(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const updateArticleState = (event) => {
    event.preventDefault();
    setArticle((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const updateArticleHandler = async (event) => {
    event.preventDefault();

    const updatedArticle = {
      headline: article.headline,
      body: article.body,
      link: article.link
    };

    const updateSuccessful = await updateArticle(
      article.id,
      updatedArticle,
      authContext.token
    );

    if (updateSuccessful) {
      setActionCompleted(true);
      setActionMessage("Article updated.");
      setTimeout(() => {
        navigate("/caretaker");
      }, 1000);
    } else {
      alert("Failed to update article, please try again.");
    }
  };

  const deleteArticleHandler = async () => {
    event.preventDefault();

    const deleteSuccessful = await deleteArticle(article.id, authContext.token);

    if (deleteSuccessful) {
      setActionCompleted(true);
      setActionMessage("Article has been deleted.");
      setTimeout(() => {
        navigate("/caretaker");
      }, 1000);
    } else {
      alert("Failed to delete article. Please try again.");
    }
  };

  useEffect(() => {
    if (article?.imageUrl && !articlePicturePreviewSetRef.current) {
      setArticlePicturePreview(article.imageUrl);
      articlePicturePreviewSetRef.current = true;
    }
  }, [article, setArticlePicturePreview, articlePicturePreviewSetRef]);

  return (
    <div className="edit-article-page">
      <header
        data-testid="edit-article-page-header"
        className="edit-article-page-header"
      >
        <h2 data-testid="edit-article-page-title">Edit news article</h2>
      </header>
      <div className="edit-article-form-container">
        <form className="edit-article-form" onSubmit={updateArticleHandler}>
          {articlePicturePreview && (
            <div className="edit-article-picture-container">
              <img
                id="article-picture"
                src={articlePicturePreview}
                alt="Article picture upload"
              />
            </div>
          )}
          <div className="edit-article-page-headline-input-container">
            <label htmlFor="headline-input">Headline</label>
            <input
              id="headline-input"
              type="text"
              data-testid="edit-article-headline-input"
              name="headline"
              placeholder="Enter a headline"
              value={article?.headline ? article.headline : ""}
              onChange={() => updateArticleState(event)}
              required
            />
          </div>
          <label htmlFor="body-input">Article body</label>
          <textarea
            id="body-input"
            name="body"
            data-testid="edit-article-body-input"
            placeholder="Enter article body here"
            value={article?.body ? article.body : ""}
            onChange={() => updateArticleState(event)}
            maxLength={4096}
            required
          />
          <label htmlFor="article-link-input">Article link</label>
          <input
            id="article-link-input"
            name="link"
            data-testid="edit-article-link-input"
            type="url"
            placeholder="Add article link"
            value={article?.link ? article.link : ""}
            onChange={() => updateArticleState(event)}
            maxLength={255}
            required
          />
          <footer className="edit-article-footer">
            {actionCompleted ? (
              <p>{actionMessage}</p>
            ) : (
              <>
                <Button
                  testId="delete-article-button"
                  type="danger"
                  onClick={deleteArticleHandler}
                >
                  Delete article
                </Button>
                <Button testId="update-article-button" type="action">
                  Update article
                </Button>
              </>
            )}
          </footer>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
