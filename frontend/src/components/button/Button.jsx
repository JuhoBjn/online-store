import "./Button.css";

const Button = ({ id = "", testId = "", type, children, onClick }) => {
  return (
    <div className="button-container">
      <button
        id={id}
        data-testid={testId}
        className={`button ${type || "action"}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
