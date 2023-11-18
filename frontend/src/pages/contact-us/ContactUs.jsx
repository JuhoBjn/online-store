import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/Button";

import "./ContactUs.css";

const ContactUs = () => {
  const [messageSent, setMessageSent] = useState(false);
  const emailRef = useRef("");
  const messageRef = useRef("");
  const navigate = useNavigate();

  const submitMessageHandler = (event) => {
    event.preventDefault();

    console.log(
      `Email: ${emailRef.current.value}, message: ${messageRef.current.value}`
    );
    setMessageSent(true);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="contact-us-page">
      <div className="contact-us-form-container">
        <h2 data-testid="contact-form-title">Contact Form</h2>
        <form
          data-testid="contact-us-form"
          id="contact-us-form"
          onSubmit={submitMessageHandler}
        >
          <label htmlFor="email-input" hidden>
            Enter your email here
          </label>
          <input
            id="email-input"
            data-testid="email-input"
            type="email"
            placeholder="Your email"
            ref={emailRef}
            required
          />
          <label htmlFor="message-input" hidden>
            Enter your message here
          </label>
          <textarea
            id="message-input"
            data-testid="message-input"
            placeholder="Leave your message here"
            ref={messageRef}
            autoComplete="on"
            rows="5"
            required
          />
          <div className="contact-us-form-footer">
            {messageSent && <p id="message-sent">&#x2714; Message sent</p>}
            <Button type="confirm">Send message</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
