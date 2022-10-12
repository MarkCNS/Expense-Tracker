import "./styles.css";

const Button = (props) => {
  return (
    <button className="input" {...props}>
      {props.children}
    </button>
  );
};

export default Button;
