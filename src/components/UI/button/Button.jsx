import classes from './Button.module.css';

const Button = (props) => {
  const { children, onClick, feature } = props;

  return (
    <button onClick={onClick} className={`${classes.btn} ${classes[feature]}`}>
      {children}
    </button>
  );
};

export default Button;
