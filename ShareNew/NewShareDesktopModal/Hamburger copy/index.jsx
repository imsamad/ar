import RightBox from "../RightBox";

import hamburger from "../../../Assets/Images/menu.png";
import "./hamburger.css";
import { useRef } from "react";
import { useMediaHook } from "../useMediaHook";

const Hamburger = ({ propState, redirectToUrl, setState }) => {
  const ref = useRef();
  const isMdOrDown = useMediaHook();

  return (
    <div
      className="hamburger bgWhiteTopMost"
      style={{
        border: "0px solid red",
        // paddingRight: "0.5rem",
        background: "transparent",
      }}
      ref={ref}
      onClick={() => {
        ref.current.classList.toggle("open");
      }}
    >
      <img
        src={hamburger}
        alt="hamburger"
        width={isMdOrDown ? 26 : 40}
        height={isMdOrDown ? 26 : 40}
        style={{ marginRight: "0rem", cursor: "pointer", marginLeft: "0.0rem" }}
      />
      <div className="hamburgerContent">
        <RightBox
          propState={propState}
          redirectToUrl={redirectToUrl}
          setState={setState}
          showProductDetails={true}
        />
      </div>
    </div>
  );
};
export default Hamburger;
