import { useMediaHook } from "../useMediaHook";

const ActualityLogo = ({ propState, centerIt = false, biggerFont = false }) => {
  const isMdOrDown = useMediaHook();
  return (
    <div
      style={{
        border: "0px solid red",
        position: centerIt || isMdOrDown ? "static" : "absolute",
        bottom: centerIt || isMdOrDown ? "auto" : "1.25rem",
        left: centerIt || isMdOrDown ? "auto" : "1.25rem",
        transform: `translateX(${0})`,
        background: "transparent",
        paddingBottom: !centerIt && isMdOrDown ? "1rem" : 0,
      }}
      className="bgWhiteTopMost"
    >
      <a
        href="https://actuality.live/"
        target="_blank"
        style={{
          textDecoration: "none",
          color: "#000",
          fontWeight: 400,
          fontSize: biggerFont ? 20 : isMdOrDown ? 14 : 16,
          border: "0px solid green",
          display: "inline-flex",
          justifyContent: "center",
          wrap: "no-wrap",
          cursor: "pointer",
          width: isMdOrDown ? "100%" : "max-content",
        }}
      >
        <span style={{ wordBreak: "unset" }}>
          {propState?.language === "French" ? "Alimenté par " : "powered by "}
        </span>
        &nbsp;
        <b
          style={{
            wordBreak: "unset",
            wordWrap: "unset",
          }}
        >
          actuality.live
        </b>
      </a>
    </div>
  );
};
export default ActualityLogo;
