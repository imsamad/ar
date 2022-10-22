import arimage from "../../../../Assets/newIcons/arIcon.png";
// import ModelPopUp from "../ModelPopUp";
import { useMediaHook } from "../useMediaHook";
const ArBtn = ({ activateAR }) => {
  const isMdOrDown = useMediaHook();

  return (
    <>
      <button
        id="SDM_QR_TEXT"
        onClick={() => {
          activateAR();
        }}
        style={{
          position: isMdOrDown ? "static" : "absolute",
          bottom: isMdOrDown ? "auto" : "1.25rem",
          left: isMdOrDown ? "auto" : "50%",
          display: isMdOrDown ? "flex" : "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `1px 2px 5px rgba(0, 0, 0, 0.1)`,
          borderRadius: `10px`,
          // padding: "2rem",
          width: `245px`,
          height: "54.09px",
          transform: isMdOrDown ? "none" : "translateX(-50%)",
          outline: "none",
          border: "none",
          border: "0px solid red",
        }}
        className="bgWhiteTopMost"
      >
        <img
          src={arimage}
          width={isMdOrDown ? 25 : 38}
          height={isMdOrDown ? 25 : 40}
          alt="ar image icon"
        />
        <div
          style={{
            marginLeft: "0.5rem",
            fontSize: "16px",
            fontWeight: 500,
            wordWrap: "keep-all",
            color: "#2E2E2E",
          }}
        >
          {`View in your space`}
        </div>
      </button>
    </>
  );
};

export default ArBtn;
