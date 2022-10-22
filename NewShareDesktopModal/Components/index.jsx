import { useMediaHook } from "../useMediaHook";
import { API } from "../../../Constants/APIs";
import { Check } from "@material-ui/icons";
import ExitBtn from "../ExitBtn";
import React, { useRef } from "react";
import "./components.css";

const Components = ({
  hideMaterials,
  propState,
  selectMaterial,
  checkSelected,
}) => {
  const isMdOrDown = useMediaHook();
  const ref = useRef();
  return (
    <div
      className="bgWhiteTopMost SDM_COMPO_components"
      ref={ref}
      style={{
        border: "0px solid red",
        borderRight: "0 solid red",
        zIndex: 2000,
      }}
    >
      {!isMdOrDown && (
        <ExitBtn
          rightAlign={true}
          onClick={() => {
            ref.current.classList.toggle("close");
          }}
        />
      )}
      {/* Contents */}
      <div
        className="SDM_COMPO_content"
        style={{
          borderRight: 0,
          borderTop: isMdOrDown ? "0px solid #ddd" : 0,
          borderBottom: isMdOrDown ? "0px solid #ddd" : 0,
          maxHeight: isMdOrDown ? 100 : "300px",
          height: "100%",
          borderRadius: isMdOrDown ? 0 : `0px 15px 15px 0px`,
          boxShadow: "none",
          maxWidth: "100%",
          width: "100%",
          overflow: "auto",
          // overflowX: isMdOrDown ? "auto" : "hidden",
          paddingLeft: isMdOrDown ? "0" : "1.25rem",
          display: isMdOrDown ? "flex" : "block",
          flexWrap: "nowrap",
          // overflow: "hidden",
          borderRight: "0px solid red",
          // border: "2px solid green",
          // borderRight: 0,
        }}
      >
        {propState.Components.map((single, index) => (
          <div
            className="SDM_COMPO_oneCompo"
            key={`${single?.component_name}-${index}`}
            style={{
              border: "0px solid aqua",
              marginRight: isMdOrDown ? "1.25rem" : 0,
              // marginBottom: isMdOrDown ? "1.5rem" : 0,
            }}
          >
            <div
              className="SDM_COMPO_compoTitle"
              style={{
                fontWeight: 400,
                fontSize: "15px",
                marginBottom: "0.6rem",
              }}
            >
              {single?.component_name}
            </div>

            <div
              className="SDM_COMPO_compoMaterials"
              style={{
                display: isMdOrDown ? "flex" : "inline-flex",
                flexDirection: isMdOrDown ? "row" : "column",
                alignItems: isMdOrDown ? "flex-start" : "center",
                justifyContent: isMdOrDown ? "space-around" : "flex-start",

                borderRight:
                  !isMdOrDown || propState.Components.length - 1 == index
                    ? 0
                    : "2px solid #ddd",
              }}
            >
              {/* {(!isMdOrDown || propState.Components.length - 1 == index) && (
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    border: "1px solid black",
                    margin: "auto",
                  }}
                />
              )} */}
              {single.materials?.map((material, indexM) => {
                // console.log(`material.material_type `, material.material_type);
                // console.log(
                //   ` material.material_value `,
                //   API.imgUrl + material.material_value
                // );
                return (
                  <React.Fragment key={`${material.title}-${indexM}`}>
                    <div
                      className="SDM_COMPO_singleMaterial"
                      style={{
                        width: isMdOrDown ? 49 : 50,
                        // marginTop: "0.5rem",
                        border: "0px solid red",
                        marginRight: isMdOrDown ? "0.5rem" : 0,
                      }}
                      key={`${material.title}-${indexM}`}
                      onClick={() => {
                        selectMaterial(material._id, single._id);
                      }}
                    >
                      {material.material_type === "color" ? (
                        <div
                          className="SDM_COMPO_materialFig"
                          style={{
                            width: isMdOrDown ? 49 : 50,
                            height: isMdOrDown ? 49 : 50,
                            borderRadius: 5,
                            boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                            backgroundColor: material.material_value,
                            display: "grid",

                            placeItems: "center",
                            border: "0px solid red",
                          }}
                        >
                          {!checkSelected(material._id, single._id) ? (
                            ""
                          ) : (
                            <div>
                              <Check
                                size="large"
                                style={{
                                  color: "#000",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="SDM_COMPO_materialFig"
                          style={{
                            border: "0px solid black",
                            position: "relative",
                            width: isMdOrDown ? 49 : 50,
                            height: isMdOrDown ? 49 : 50,
                          }}
                        >
                          <img
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              left: 0,
                              bottom: 0,
                              borderRadius: 5,
                              boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                              zIndex: 100,
                            }}
                            src={API.imgUrl + material.material_value}
                            width={isMdOrDown ? 49 : 50}
                            height={isMdOrDown ? 49 : 50}
                            alt="s"
                          />
                          {!checkSelected(material._id, single._id) ? (
                            ""
                          ) : (
                            <div
                              style={{
                                zIndex: 110,
                                position: "absolute",
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                                border: "0px solid aqua",
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              <Check
                                size="large"
                                style={{
                                  color: "#000",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {/* <div
                        className="SDM_COMPO_materialFig"
                        style={{
                          width: isMdOrDown ? 49 : 50,
                          height: isMdOrDown ? 49 : 50,
                          borderRadius: 5,
                          boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
                          backgroundColor:
                            material.material_type === "color"
                              ? material.material_value
                              : `none`,
                          display: "grid",
                          backgroundImage:
                            material.material_type === "color"
                              ? "none"
                              : `url(${
                                  API.imgUrl + material.material_value
                                }) no-repeat center cover`,
                          placeItems: "center",
                          border: "2px solid red",
                        }}
                      >
                        {!checkSelected(material._id, single._id) ? (
                          ""
                        ) : (
                          <div>
                            <Check
                              size="large"
                              style={{
                                color: "#000",
                              }}
                            />
                          </div>
                        )}
                      </div> */}
                      <div
                        className="SDM_COMPO_materialTitle"
                        style={{
                          textAlign: "center",
                          wordBreak: "break-all",
                          fontWeight: 500,
                          fontSize: isMdOrDown ? "11px" : "12px",
                          marginTop: "0.5rem",
                          marginBottom: isMdOrDown ? "0" : "0.5rem",
                        }}
                      >
                        {material.material_name}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Components;
