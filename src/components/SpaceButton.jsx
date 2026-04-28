import { useNavigate } from "react-router-dom";

const SpaceButton = ({ text = "CLICK", to = "/", onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick(); // custom function
    if (to) navigate(to);   // navigation
  };

  return (
    <button type="button" className="btn" onClick={handleClick}>
      <strong>{text}</strong>

      <div id="container-stars">
        <div id="stars"></div>
      </div>

      <div id="glow">
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </button>
  );
};

export default SpaceButton;