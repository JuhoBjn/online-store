import { useState } from "react";
import "./Payment.css";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";

const Payment = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Do something with the payment information here
    navigate("/auth#signup");
  };

  return (
    <div className="payment-page">
      <div className="payment-page-container">
        <header
          data-testid="payment-page-header"
          className="payment-page-header"
        >
          <h1 data-testid="payment-page-title" id="payment-page-title">
            GoldenAge payment
          </h1>
        </header>
        <section className="payment-page-content">
          <p data-testid="payment-page-introduction">
            At GoldenAge we believe that everyone should have a taste of our
            wide range of activities and events. That is why we offer a free
            30-day trial period for all new users. After the trial period, you
            can continue to enjoy our services for only 14.99€/month. You can
            cancel your subscription at any time. You will not be charged until
            the end of your trial period. (This is a demo site, no payment will
            be made or payment information sent to any server)
          </p>
        </section>
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <form className="payment-page-form" onSubmit={submitHandler}>
          <input
            type="number"
            name="number"
            placeholder="Card Number"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY Expiry"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
            onBlur={() => setState((prev) => ({ ...prev, focus: "" }))} // Remove focus when user clicks away
          />

          <Button testId="payment-page-submit" type="action">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
