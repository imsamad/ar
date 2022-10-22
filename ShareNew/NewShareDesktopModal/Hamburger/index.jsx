// import { ProductDetails } from "../RightBox";

import hamburger from "../../../../Assets/Images/menu.png";
import cancelToggle from "../../../../Assets/Images/cancelToggle.png";
import "./hamburger.css";
import { useRef, useState } from "react";
import { useMediaHook } from "../useMediaHook";

const Hamburger = ({ propState, redirectToUrl, setState }) => {
  const ref = useRef();
  const isMdOrDown = useMediaHook();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="hamburger bgWhiteTopMost"
      style={{
        border: "0px solid red",
        width: 50,
        height: 50,
        background: "transparent",
        marginRight: "0.5rem",
      }}
      ref={ref}
      onClick={() => {
        ref.current.classList.toggle("open");
        setIsOpen((p) => !p);
      }}
    >
      <div className="hamburgerContent" style={{ zIndex: 999 }}>
        <ProductDetails
          propState={propState}
          redirectToUrl={redirectToUrl}
          setState={setState}
        />
      </div>
      <img
        src={isOpen ? cancelToggle : hamburger}
        alt="hamburger"
        width={isMdOrDown ? (isOpen ? 20 : 35) : 40}
        height={isMdOrDown ? (isOpen ? 20 : 35) : 40}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          cursor: "pointer",
          transform: "translate(-50%,-50%)",
          zIndex: 99999,
        }}
      />
    </div>
  );
};
export default Hamburger;

const ProductDetails = ({ propState, redirectToUrl, setState }) => {
  const isMdOrDown = useMediaHook();
  return (
    <>
      <div
        style={{
          boxShadow: `1px 2px 5px rgba(0, 0, 0, 0.1)`,
          borderRadius: `15px`,
          padding: "1rem",
          border: "0px solid red",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: 15,
            paddingRight: "2rem",
          }}
        >
          {propState?.productName || propState?.productDel?.title || "Title"}
        </div>
        <div
          style={{
            fontSize: 13,
          }}
        >
          {propState?.productDel?.sub_title || "Subtitle"}
        </div>
      </div>

      <div
        onClick={() => {
          redirectToUrl();
          setState({ count: propState.count + 1 }, () => {
            // console.log(this.props.propState.count);
          });
        }}
        style={{
          boxShadow: `1px 2px 5px rgba(0, 0, 0, 0.1)`,
          borderRadius: `15px`,
          padding: "1rem",
          border: "0px solid red",
          marginTop: "0.5rem",
          cursor: "pointer",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          {propState?.productDel?.link_title ?? "Buy Now"}
        </div>
        <div
          style={{
            fontSize: 13,
          }}
        >
          {propState?.productDel?.link_description ?? "From Someweb.com"}
        </div>
      </div>
    </>
  );
};
