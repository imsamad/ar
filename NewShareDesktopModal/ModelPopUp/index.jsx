import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "../../../App.scss";
import QRCode from "qrcode.react";
import { deviceSupported } from "../../Constant";

const ModelPopUp = forwardRef(({ propState, matchparams }, ref) => {
  const ref1 = useRef();
  const ref2 = useRef();
  const openARPopUp = () => {
    ref1.current.style.display = "block";
    ref2.current.classList.add("slideIn");
    ref2.current.style.opacity = 1;
  };
  const closeModal = () => {
    ref1.current.style.display = "none";
    ref2.current.classList.remove("slideIn");
    ref2.current.style.opacity = 0;
  };
  useImperativeHandle(ref, () => ({
    openARPopUp: openARPopUp,
  }));

  return (
    <div
      style={{
        zIndex: 9999999999999,
      }}
    >
      <div
        ref={ref1}
        id="myModal"
        className="modal"
        style={
          {
            // display: "none",
          }
        }
      ></div>
      <div
        ref={ref2}
        className="modal-content"
        style={{ height: "390px", width: "250px" }}
      >
        <div className="">
          <h1 style={{ fontSize: "19px", textAlign: "center" }}>
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
          <p style={{ width: "250px", border: "0px solid red", padding: 0 }}>
            {deviceSupported(propState.language)}
            {/* {propState.language === "French"
              ? `fonctionne mieux avec l'iPhone 12 et supérieur`
              : `* Works best with iPhone 12 & above.`}{" "} */}
          </p>
        </div>
        <div id="qrCodeWrapper">
          {propState.productStatus === "draft" ? (
            <QRCode
              value={"https://portal.actuality.live/share/" + matchparams.id}
              style={{ height: 200, width: 200, marginTop: 12 }}
            />
          ) : (
            <QRCode
              value={"https://actuality.live/share/" + matchparams?.id}
              style={{ height: 130, width: 130, marginTop: 12 }}
            />
          )}
        </div>
        <span
          className="closeBtn"
          onClick={closeModal}
          style={{
            border: "0px solid red",
            position: "absolute",
            bottom: "17px",
            left: "32px",
            minWidth: "168px",
            color: "#000",
            border: `1px solid #222`,
          }}
        >
          {propState.language === "French" ? "Proche" : "Close"}
        </span>
      </div>
    </div>
  );
});

export default ModelPopUp;
