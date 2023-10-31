import "./Button.css";

const Button = ({ type, children, onClick }) => {
  return (
    <div className="button-container">
      <button className={`button ${type || "action"}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
