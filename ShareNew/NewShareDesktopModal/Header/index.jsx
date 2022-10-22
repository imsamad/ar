import { API } from "../../../../Constants/APIs";

import { useMediaHook } from "../useMediaHook";

import closeModal from "../../../../Assets/newIcons/closeModal.png";

import Hamburger from "../Hamburger";

import { isRenderInIframe, sendOriginBack } from "../lib";

const Header = ({ propState, redirectToUrl, setState }) => {
  const isMdOrDown = useMediaHook();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: isMdOrDown ? "center" : "	flex-start",
        padding: "1.25rem 1rem 0rem 0.5rem",
        paddingTop: isMdOrDown ? "1rem" : "1.25rem",
        border: "0px solid aqua",
      }}
      className="mvLevel"
    >
      {propState.productDel.product_logo ? (
        <div
          style={{
            width: `calc(${isMdOrDown ? 65 : 56.28}px + ${
              isMdOrDown ? 1.5 : 3
            }rem)`,
            border: "0px solid red",
            display: "grid",
            placeItems: "center",
            backgroundColor: "transparent",
          }}
          className="bgWhiteTopMost"
        >
          <img
            style={{
              borderRadius: isMdOrDown ? 7 : 15,
              backgroundColor: "transparent",
            }}
            src={API.imgUrl + propState.productDel.product_logo}
            alt="company_logo"
            width={!isMdOrDown ? 65 : 79}
            height={!isMdOrDown ? 65 : 79}
          />
        </div>
      ) : (
        ""
      )}
      {!isMdOrDown && (
        <div
          className="bgWhiteTopMost"
          style={{
            // position: "absolute",
            // left: "110px",
            // top: "1.5rem",
            border: "0px solid red",
            display: "inline-block",
            backgroundColor: "transparent",
          }}
        >
          <div
            style={{
              fontWeight: 500,
              fontSize: 20,
              fontStyle: "Normal",
              marginBottom: "0.2rem",
            }}
          >
            {propState.productDel.title ?? ""}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              fontStyle: "Normal",
            }}
          >
            {propState.productDel.sub_title ?? ""}{" "}
          </div>
        </div>
      )}
      <div style={{ flexGrow: 1 }} className="mvLevel" />
      {isMdOrDown && (
        <Hamburger
          propState={propState}
          redirectToUrl={redirectToUrl}
          setState={setState}
        />
      )}

      {isRenderInIframe() && (
        <img
          src={closeModal}
          onClick={sendOriginBack}
          alt="closeIcon"
          width={isMdOrDown ? 26 : 40}
          height={isMdOrDown ? 26 : 40}
          style={{
            borderRadius: "15px",
            cursor: "pointer",
            marginLeft: "0.5rem",
            border: "0px solid red",
            // position: "absolute",
            // top: "1.5rem",
            // right: "1.25rem",
          }}
        />
      )}
    </div>
  );
};

export default Header;
