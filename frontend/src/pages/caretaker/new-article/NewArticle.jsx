import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../utils/AuthContext";
import Button from "../../../components/button/Button";
import { createNewArticle } from "../../../utils/NewsAPI";

import "./NewArticle.css";

const NewArticle = () => {
  const [article, setArticle] = useState(null);
  const [articlePicture, setArticlePicture] = useState(null);
  const [articlePicturePreview, setArticlePicturePreview] = useState(null);
  const [articlePosted, setArticlePosted] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const pictureHandler = (event) => {
    event.preventDefault();

    const picture = event.target.files[0];

    // Display an alert and discard the iamge if the file is
    // larger than 5MiB.
    if (picture.size > 1024 * 1024 * 5) {
      return alert("Image file is too large, please select a smaller image.");
    }

    const reader = new FileReader();
    setArticlePicture(picture);
    reader.onload = (e) => {
      setArticlePicturePreview(e.target.result);
    };
    reader.readAsDataURL(picture);
  };

  const updateArticleState = (event) => {
    event.preventDefault();

    setArticle((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const postNewArticle = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("json", JSON.stringify(article));
    if (articlePicture) {
      formData.append("file", articlePicture);
    }

    const response = await createNewArticle(formData, authContext.token);
    if (response) {
      setArticlePosted(true);
      setTimeout(() => navigate("/caretaker"), 800);
    } else {
      console.error("Failed to post article");
      alert("Failed to post article. Please try again.");
    }
  };

  return (
    <div className="new-article-page">
      <div className="new-article-form-container">
        <form className="new-article-form" onSubmit={postNewArticle}>
          <div className="new-article-form-picture-input-container">
            {articlePicture && (
              <img
                id="article-picture-preview"
                src={articlePicturePreview}
                alt="Article picture upload"
              />
            )}
            <h3>Click here to upload image</h3>
            <input
              id="article-picture-input"
              data-testid="article-picture-input"
              name="file"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={pictureHandler}
            />
          </div>
          <div className="new-article-page-headline-container">
            <label htmlFor="headline-input">Headline</label>
            <input
              id="headline-input"
              type="text"
              data-testid="article-headline-input"
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
            data-testid="article-body-input"
            placeholder="Enter article body here"
            onChange={() => updateArticleState(event)}
            maxLength={4096}
            required
          />
          <label htmlFor="article-link-input">Article link</label>
          <input
            id="article-link-input"
            name="link"
            data-testid="article-link-input"
            type="url"
            placeholder="Add article link"
            onChange={() => updateArticleState(event)}
            maxLength={255}
            required
          />
          {articlePosted ? (
            <p>&#x2714; Article posted</p>
          ) : (
            <Button testId="post-article-button" type="confirm">
              Post article
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewArticle;
