import "./Button.css";

const Button = ({ id = "", type, children, onClick }) => {
  return (
    <div className="button-container">
      <button
        id={id}
        className={`button ${type || "action"}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
