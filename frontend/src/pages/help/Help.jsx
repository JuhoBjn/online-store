import { Link } from "react-router-dom";

import "./Help.css";

const Help = () => {
  return (
    <div className="help-page">
      <div className="help-page-container">
        <header data-testid="help-page-header" className="help-page-header">
          <h1 data-testid="help-page-title" id="help-page-title">
            Welcome to GoldenAge - Your Supportive Community
          </h1>
        </header>
        <section className="help-page-content">
          <p data-testid="help-page-introduction">
            At GoldenAge, we understand that sometimes you may need a helping
            hand or have questions about our services. Our Help Page is here to
            guide you through any queries you might have and provide the
            assistance you need. Click on the blue, underlined words for more
            information about the topic.
          </p>
          <h2
            data-testid="help-page-assist-you-heading"
            className="help-page-heading-2"
          >
            How Can We Assist You?
          </h2>
          <ol data-testid="help-page-assist-you-list">
            <li data-testid="help-page-li-getting-started">
              Getting started: If you&apos;re new to GoldenAge or need help
              navigating our website, check out our{" "}
              <Link className="help-page-link" to="/help">
                getting started guide
              </Link>{" "}
              for step-by-step instructions.
            </li>
            <li data-testid="help-page-li-account-support">
              Account Support: Having trouble with your{" "}
              <Link className="help-page-link" to="/help">
                account
              </Link>
              ? Whether it&apos;s login issues, password resets, or profile
              updates, we&apos;ve got you covered.
            </li>
            <li data-testid="help-page-li-event-registration">
              Event Registration:{" "}
              <Link className="help-page-link" to="/help">
                Learn
              </Link>{" "}
              how to register for upcoming events, workshops, and special
              programs. We want to ensure you don&apos;t miss out on any
              exciting opportunities.
            </li>
            <li data-testid="help-page-li-technical-support">
              Technical Support: If you encounter technical difficulties while
              using our platform or have questions about our virtual events, our{" "}
              <Link className="help-page-link" to="/help">
                technical support team
              </Link>{" "}
              is ready to assist you.
            </li>
          </ol>
          <h2
            data-testid="help-page-faq-heading"
            className="help-page-heading-2"
          >
            Frequently Asked Questions (FAQs):
          </h2>
          <p data-testid="help-page-faq-content">
            Explore our{" "}
            <Link className="help-page-link" to="/help">
              FAQs section
            </Link>{" "}
            for quick answers to common questions. We&apos;ve compiled a list of
            the most frequently asked questions to provide you with instant
            solutions.
          </p>
          <h2
            data-testid="help-page-feedback-heading"
            className="help-page-heading-2"
          >
            Feedback:
          </h2>
          <p data-testid="help-page-feedback-content">
            We value your{" "}
            <Link className="help-page-link" to="/help">
              feedback
            </Link>
            ! If you have suggestions, comments or ideas to improve our
            services, please let us know. Your input is crucial in making
            GoldenAge the best it can be.
          </p>
          <footer data-testid="help-page-footer" className="help-page-footer">
            <p>If you have more questions, please contact us:</p>
            <br />
            <p data-testid="help-page-footer-email">
              Email: info@goldenage.com
            </p>
            <p data-testid="help-page-footer-phone">Tel.: +358 771884</p>
            <p data-testid="help-page-footer-address">
              Adr.: Kuntokatu 3, 33520 Tampere, FI
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Help;
