import React from "react";
import { useMediaHook } from "../useMediaHook";
import ExitBtn from "../ExitBtn";
import "./rightBox.css";
import { useRef } from "react";
const RightBox = ({ propState, redirectToUrl, setState }) => {
  const isMdOrDown = useMediaHook();
  const ref = useRef();
  return (
    <div
      className="bgWhiteTopMost rightBox"
      ref={ref}
      style={{
        position: isMdOrDown ? "static" : "absolute",
        top: isMdOrDown ? "auto" : "50%",
        right: isMdOrDown ? "auto" : "0",
      }}
    >
      <div className="rightBoxWrapper">
        {!isMdOrDown && (
          <ExitBtn
            onClick={() => {
              ref.current.classList.toggle("close");
            }}
          />
        )}

        <div
          className="content"
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            redirectToUrl();
            setState({ count: propState.count + 1 }, () => {
              // console.log(this.props.propState.count);
            });
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            {propState?.productDel?.link_title ?? "Buy Now"}
          </div>
          <div
            style={{
              fontWeight: 400,
              fontSize: `10px`,
              marginTop: "0.2rem",
            }}
          >
            {propState?.productDel?.link_description ?? "From Someweb.com"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBox;
export const ProductDetails = ({ propState, redirectToUrl, setState }) => {
  return (
    <>
      <div
        className="content"
        style={{
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: 0,
          border: "0px solid red",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {propState?.productName || propState?.productDel?.title}
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: `10px`,
            marginTop: "0.2rem",
            border: "0px solid aqua",
          }}
        >
          {propState?.productDel?.sub_title}
        </div>
      </div>

      <div
        className="content"
        style={{
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          border: 0,
          cursor: "pointer",
        }}
        onClick={() => {
          redirectToUrl();
          setState({ count: propState.count + 1 }, () => {
            // console.log(this.props.propState.count);
          });
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {propState?.productDel?.link_title ?? "Buy Now"}
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: `10px`,
            marginTop: "0.2rem",
          }}
        >
          {propState?.productDel?.link_description ?? "From Someweb.com"}
        </div>
      </div>
    </>
  );
};
