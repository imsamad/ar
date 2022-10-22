import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "../../../../App.scss";
import QRCode from "qrcode.react";
import { isRenderInIframe, sendOriginBack } from "../lib";
import { useEffect } from "react";

const ModelPopUp = forwardRef(({ propState, matchparams, keepOpen }, ref) => {
  const ref1 = useRef();
  const ref2 = useRef();
  const openARPopUp = () => {
    !isRenderInIframe() && (ref1.current.style.display = "block");
    // ref1.current.style.background = "transparent";
    ref2.current.classList.add("slideIn");
    ref2.current.style.opacity = 1;
  };
  const closeModal = () => {
    ref1.current.style.display = "none";
    ref2.current.classList.remove("slideIn");
    ref2.current.style.opacity = 0;
    sendOriginBack();
  };
  useImperativeHandle(ref, () => ({
    openARPopUp: openARPopUp,
    open: openARPopUp,
  }));
  useEffect(() => {
    if (keepOpen) openARPopUp();
  }, []);
  return (
    <div
      style={{
        zIndex: 9999999999999,
        bottom: 0,
        right: 0,
      }}
    >
      <div
        ref={ref1}
        id="myModal"
        className="modal"
        style={{
          border: "0px solid red",
          // display: "none",
        }}
      ></div>

      <div
        stye={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          // background: "rgba(0,0,0,0.5)",
          background: "#000",
        }}
      />
      <div
        ref={ref2}
        className="modal-content"
        style={{
          width: "300px",
          padding: "1.75rem 1.5rem",
          // height: "430px",
          border: "2px solid #ddd",
        }}
      >
        <h1 style={{ fontSize: "20px", textAlign: "center" }}>
          {propState.language === "French"
            ? "Comment afficher en réalité augmentée"
            : "How to View in Augmented Reality"}
        </h1>
        <p style={{ width: "250px" }}>
          {propState.language === "French"
            ? `Scannez ce QR code avec votre téléphone pour visualiser l'objet dans votre espace. L'expérience se lance directement depuis votre navigateur - aucune application requise ! `
            : `Scan this QR code with your phone to view the object in your
space. The experience launches directly from your browser - no app
required !`}
        </p>
        <p style={{ width: "250px" }}>
          {propState.language === "French"
            ? `fonctionne mieux avec l'iPhone 12 et supérieur`
            : `*works best with iPhone 12 & above`}{" "}
        </p>
        <div
          id="qrCodeWrapper"
          style={{ border: "0px solid red", width: "auto", height: "auto" }}
        >
          {propState.productStatus === "draft" ? (
            <QRCode
              value={
                "https://portal.actuality.live/modelDynamicviewer/" +
                matchparams.id
              }
              style={{ height: 200, width: 200, marginTop: 12 }}
            />
          ) : (
            <QRCode
              value={"https://beta.actuality.live/sharetemp/" + matchparams?.id}
              style={{ height: 130, width: 130, marginTop: 12 }}
            />
          )}
        </div>
        <button
          style={{
            border: "0px solid red",
            outline: "none",
            color: "#000",
            background: "transparent",
            padding: "0.65rem",
            fontSize: "1rem",
            // position: "relative",
            border: "1.5px solid rgba(0,0,0,0.5)",
            width: "100%",
            marginTop: "1rem",
            borderRadius: "0.5rem",
          }}
          onClick={() => closeModal()}
        >
          {propState.language === "French" ? "Proche" : "Close"}
        </button>
      </div>
    </div>
  );
});

export default ModelPopUp;
