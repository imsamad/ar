import React, { useEffect, useRef } from "react";
import closeIcon from "../../../../Assets/newIcons/closeCircle.png";
import actualityLogoMobile from "../../../../Assets/newIcons/actualityLogoMobile.png";

// Icons for desktop
import mouse1 from "../../../../Assets/newIcons/mouse1.png";
import mouse2 from "../../../../Assets/newIcons/mouse2.png";

// Icons for mobile
import mobile1 from "../../../../Assets/newIcons/mobile1.gif";
import mobile2 from "../../../../Assets/newIcons/mobile2.gif";
import mobile31 from "../../../../Assets/newIcons/mobile31.png";
import mobile32 from "../../../../Assets/newIcons/mobile32.png";
import mobile33 from "../../../../Assets/newIcons/mobile33.png";

import "./instructionModal.css";
import { useMediaHook } from "../useMediaHook";
import { isRenderInIframe, sendOriginBack } from "../lib";
import { isMobile } from "../../../../Helpers/isMobile";
import ModelPopUp from "../ModelPopUp";
import MobileNotSupportAr from "../MobileNotSupportAr";

const InstructionModal = ({
  matchparams,
  propState,
  canActivateAr,
  activateAR,
}) => {
  const ref = useRef();
  const arModalRef = useRef();
  const hideThisInstructionModel = () => {
    ref.current.classList.remove("show");
  };
  const arNotSupportedRef = useRef();
  const handleCloseClick = () => {
    !isRenderInIframe() && hideThisInstructionModel();
    // hideModalInIframe();
    sendOriginBack();
  };

  useEffect(() => {
    !ref.current.classList.contains("show") &&
      ref.current.classList.add("show");
  }, []);

  const isMdOrDown = useMediaHook();
  const data = isMdOrDown ? mobileData : desktopData;
  const handleGotIt = () => {
    if (!isMobile()) arModalRef.current.open();
    else if (canActivateAr()) activateAR();
    else arNotSupportedRef?.current?.open?.();
  };

  useEffect(() => {
    isRenderInIframe() && !isMobile() && arModalRef.current.open();
  }, []);

  return (
    <div
      ref={ref}
      className="instructionContainer"
      style={{
        padding: isMdOrDown ? "1.5rem" : "2rem",
        border: "0px solid green",
        overflow: isMdOrDown ? "scroll" : "hidden",
        paddingBottom: isMdOrDown ? "0.5rem" : "1.5rem",
      }}
    >
      {isMdOrDown && <MobileNotSupportAr ref={arNotSupportedRef} />}
      {!isMobile() && (
        <ModelPopUp
          matchparams={matchparams}
          propState={propState}
          ref={arModalRef}
          isOpen={true}
        />
      )}
      {/* inFrame &&  */}
      {isRenderInIframe() && !isMobile() ? null : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignSelf: "stretch",

              // minHeight: 30,
              paddingRight: isMdOrDown ? "0.5rem" : 0,
              // paddingTop: isMdOrDown ? "2rem" : 0,
              // height: isMdOrDown ? "25px" : "50px",
              border: "0px solid blue",
              marginBottom: isMdOrDown ? "0.5rem" : 0,
            }}
          >
            <img
              onClick={handleCloseClick}
              src={closeIcon}
              alt="Close Modal"
              width={isMdOrDown ? "25px" : "50"}
              height={isMdOrDown ? "25px" : "50"}
              style={{
                marginRight: 0,
                cursor: "pointer",
              }}
            />
          </div>
          <div
            style={{
              fontSize: isMdOrDown ? "20px" : "35px",
              fontWeight: isMdOrDown ? 500 : 600,
              marginTop: isMdOrDown ? "0.0rem" : 0,
              marginBottom: isMdOrDown ? "1rem" : "0",
              // marginBottom:
              color: `rgba(0,0,0,${isMdOrDown ? 0.9 : 0.6})`,
            }}
          >
            {isMdOrDown ? `How to use augmented reality` : `How to view in 3D`}
          </div>
          <div
            style={{
              // boxSizing: "content-box",
              display: "flex",
              justifyItems: "center",
              // alignItems: "center",
              flexDirection: isMdOrDown ? "column" : "row",
              border: "0px solid aqua",
              flexGrow: isMdOrDown ? 0 : 1,
              alignItems: "center",
              // maxHeight: 254,
              // paddingTop: isMdOrDown ? 0 : "3.5rem",
              // paddingBottom: isMdOrDown ? 0 : "1.5rem",
            }}
          >
            {data.map(({ text, image }, index) => (
              <React.Fragment key={text}>
                <SingleBox
                  text={text}
                  image={image}
                  rightBorder={index == 0 && !isMdOrDown}
                />
                {/* {index == 0 && !isMdOrDown && (
              <div
                style={{
                  width: "0px",
                  justifySelf: "stretch",
                  height: "80%",
                  border: `1px solid #DEDEDE`,
                }}
              />
            )} */}
              </React.Fragment>
            ))}
          </div>
          {isMdOrDown && <GestureImages />}
          <button
            style={{
              justifySelf: isMdOrDown ? "stretch" : "center",
              cursor: "pointer",
              display: "inline-flex",
              width: isMdOrDown ? 240 : 276,
              // height: isMdOrDown ? 50 : 65,
              padding: isMdOrDown ? "0.5rem" : "1.5rem",
              background: isMdOrDown ? "#D9D9D9" : "#fff",
              boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.18)`,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: isMdOrDown ? 5 : `15px`,
              border: "none",
              fontSize: isMdOrDown ? 16 : 20,
              fontWeight: 500,
              color: "#000000",
              // margin: "0.5rem 0",
              // marginTop: isMdOrDown ? "0.5rem" : "1.5rem",
              marginBottom: isMdOrDown ? "1rem" : "1rem",
            }}
            onClick={handleGotIt}
          >
            Got it
          </button>
          <div
            style={{
              alignSelf: "stretch",
              flexGrow: 1,
            }}
          />
          <div
            style={{
              justifySelf: "flex-end",
              border: "0px solid red",
              paddingBottom: isMdOrDown ? "1rem" : "2rem",
              maxWidth: 220,
            }}
          >
            <img src={actualityLogoMobile} height={16} />
            {/* <ActualityLogo
          image={mouse1}
          flexGrow={0}
          centerIt={true}
          biggerFont={true}
        /> */}
          </div>
          {isMdOrDown && (
            <div
              style={{
                // height: "1rem",
                width: "100%",
                border: "0px solid red",
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

const desktopData = [
  {
    image: mouse1,
    text: `Rotate the object 360° by holding click and dragging your mouse`,
  },
  {
    image: mouse2,
    text: `You can zoom in and out using the scroll wheel on your mouse or by using
    the zoom tool`,
  },
];

const mobileData = [
  {
    image: mobile1,
    text: `Move around and scan nearby surfaces`,
  },
  {
    image: mobile2,
    text: `Textured surfaces and images are best`,
  },
];
const handGesturesData = [
  {
    image: mobile31,
    text: `Move`,
  },
  {
    image: mobile32,
    text: `Rotate`,
  },
  {
    image: mobile33,
    text: `Zoom`,
  },
];

export default InstructionModal;
const SingleBox = ({ text, image, rightBorder }) => {
  const isMdOrDown = useMediaHook();
  return (
    <div
      style={{
        display: "flex",
        maxHeight: 254,
        flexDirection: isMdOrDown ? `column-reverse` : "column",
        alignItems: "center",
        // border:'1px solid red',
        // justifyContent: "center",
        boxShadow: isMdOrDown ? "0px 6px 4px rgba(0, 0, 0, 0.12)" : "none",
        borderRadius: isMdOrDown ? 10 : 0,
        // border: "1px solid blue",
        // margin: "auto",
        borderRight: !rightBorder ? 0 : `1px solid #DEDEDE`,
        // marginTop: isMdOrDown ? "1rem" : 0,
        marginBottom: isMdOrDown ? "1rem" : 0,
        padding: !isMdOrDown ? "3.5rem" : "0.5rem",
        paddingTop: isMdOrDown ? "0.5rem" : "3.5rem",
        width: isMdOrDown ? 235 : "inherit",
        // alignItems: "flex-start",
      }}
    >
      <img
        src={image}
        width={124}
        height={124}
        alt=""
        style={{ border: "0px solid red" }}
      />
      <div
        style={{
          maxWidth: 320,
          fontWeight: isMdOrDown ? 500 : 500,
          fontSize: isMdOrDown ? "16px" : 18,
          marginTop: "1rem",
          color: `rgba(0,0,0,${isMdOrDown ? 0.6 : 0.6})`,
          border: "0px solid red",
          paddingBottom: isMdOrDown ? `0.5rem` : 0,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const GestureImages = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // border: "0px solid red",
        // // padding: "0.5rem 0 0.5rem 0",
        border: "0px solid red",
        marginBottom: "1.5rem",
        marginTop: "1.5rem",
      }}
    >
      {handGesturesData.map((pic, index) => (
        <div
          key={pic.text}
          style={{
            padding: "0.5rem",
            // paddingLeft: index == 0 ? 0 : "0.5rem",
            paddingRight: index == 2 ? 0 : "0.5rem",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              color: "#2E2E2E",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            {pic.text}
          </div>
          <img src={pic.image} width={70} height={85} />
        </div>
      ))}
    </div>
  );
};
