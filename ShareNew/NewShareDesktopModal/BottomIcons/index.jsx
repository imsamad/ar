import React from "react";

import zoom from "../../../../Assets/newIcons/zoomIcon.png";
import rotate from "../../../../Assets/newIcons/rotateIcon.png";
const data = [
  {
    image: rotate,
    text: "Drag to Rotate",
  },
  {
    image: zoom,
    text: "Scroll to zoom",
  },
];

const BottomIcons = () => {
  return (
    <div
      className="bgWhiteTopMost"
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 22,
        right: 30,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {data.map((d) => (
        <div
          style={{
            marginTop: "1rem",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          key={d.text}
        >
          <img src={d.image} alt="" width={30} height={30} />
          <div
            style={{
              fontWeight: 500,
              fontSize: 12,

              textAlign: "center",

              color: "#5C5C5C",
              marginTop: "0.5rem",
            }}
          >
            {d.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomIcons;
