import React from "react";
import ActualityLogo from "../ActualityLogo";
import ArBtn from "../ArBtn";
import Components from "../Components";

const MobileBottom = ({
  hideMaterials,
  propState,
  selectMaterial,
  checkSelected,
  activateAR,
}) => {
  return (
    <div
      style={{
        // position: "absolute",
        // left: 0,
        // right: 0,
        // bottom: 0,
        display: "flex",

        flexDirection: "column",
        alignItems: "center",
        border: "0px solid red",
      }}
    >
      {/* <ArBtn activateAR={activateAR} /> */}
      <div
        style={{
          marginTop: "1rem",
          border: "0px solid #ddd",
          // borderRight: 0,
          // borderLeft: 0,
          padding: "1rem",
          width: "100%",
          paddingLeft: "1rem",
          paddingTop: 0,
          zIndex: 2000,
          paddingBottom: "0.5rem",
        }}
      >
        <Components
          hideMaterials={hideMaterials}
          propState={propState}
          selectMaterial={selectMaterial}
          checkSelected={checkSelected}
        />
      </div>
      <ActualityLogo propState={propState} />
    </div>
  );
};

export default MobileBottom;
