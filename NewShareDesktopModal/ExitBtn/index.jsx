import { useRef } from "react";
import leftArrow from "../../../Assets/newIcons/left.png";
import rightArrow from "../../../Assets/newIcons/next.png";
import "./exitBtn.css";
const ExitBtn = ({ rightAlign, onClick }) => {
  const ref = useRef();
  return (
    <button
      ref={ref}
      style={{
        left: rightAlign ? "100%" : 0,
        right: rightAlign ? 0 : "-100%",
      }}
      className={
        rightAlign
          ? "rightAlign bgWhiteTopMost exitBtn"
          : "leftAlign bgWhiteTopMost exitBtn"
      }
      onClick={() => {
        ref.current.classList.toggle("rotate");
        onClick();
      }}
    >
      <img
        src={rightAlign ? leftArrow : rightArrow}
        alt="Left"
        width={20}
        height={20}
      />
    </button>
  );
};

export default ExitBtn;
