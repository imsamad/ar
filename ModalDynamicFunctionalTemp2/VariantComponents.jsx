import { Typography } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";

import "../../App.scss";
import { API } from "../../Constants/APIs";
const VariantComponents = ({
  variantControllerHeight,
  Component,
  selectMaterial,
  checkSelected,
  addClass = false,
}) => {
  return (
    <div className={addClass ? "variant__wrapper" : ""}>
      <div
        className="variantControls "
        style={{
          height: variantControllerHeight,
          // height: "auto",
          width: window.innerWidth,
          display: "inline-flex",
          // border: "1px solid red",
          padding: 0,
          paddingLeft: 8,
        }}
      >
        {Component.map((single, index1) => (
          <div
            className="singleComponent"
            style={{
              border: "0px solid blue",
              display: "flex",
              flexDirection: "column",
              // padding: 0,
            }}
          >
            <Typography
              style={{ marginLeft: 6, fontWeight: 500, fontSize: 17 }}
            >
              {single.component_name}
            </Typography>
            <div
              className="framesWrapper"
              style={{
                maxHeight: "100%",
                height: "100%",
                border: "0px solid red",
                // overflow: "hidden",
                padding: 0,
                flex: 1,

                overflowY: "scroll",
              }}
            >
              <div
                className="variantListing"
                style={{
                  border: "0px solid aqua",
                  display: "flex",
                  paddingRight: 0,
                  minWidth: "auto",
                }}
              >
                {single.materials[0]._id
                  ? single.materials.map((material, index) => (
                      <div
                        className="singleVariant"
                        style={{
                          border: "0px solid blue",
                          marginRight: 10,
                        }}
                      >
                        {material.material_type === "color" ? (
                          <>
                            <div
                              onClick={() => {
                                selectMaterial(material._id, single._id);
                              }}
                              className="paletteBox"
                              style={{
                                backgroundColor: material.material_value,
                              }}
                              key={index}
                            >
                              {checkSelected(material._id, single._id) ? (
                                <div className="selected">
                                  <Check style={{ color: "#000" }} />
                                </div>
                              ) : null}
                            </div>

                            <div
                              style={{
                                inlineSize: "58px",
                                overflowWrap: "break-word",
                                marginTop: 20,
                                border: "0px solid red",
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  fontSize: "14px",
                                  fontFamily: "Inter",
                                }}
                              >
                                {material.material_name}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="paletteBox">
                              <img
                                onClick={() => {
                                  selectMaterial(material._id, single._id);
                                }}
                                key={index}
                                src={API.imgUrl + material.material_value}
                                className="paletteBox"
                                style={{
                                  marginTop: "0px",
                                  marginLeft: "0px",
                                }}
                                alt=""
                              />
                              {checkSelected(material._id, single._id) ? (
                                <div className="selected">
                                  <Check style={{ color: "#000" }} />
                                </div>
                              ) : null}
                            </div>
                            <div
                              style={{
                                inlineSize: "58px",
                                overflowWrap: "break-word",
                                marginTop: 12,
                                // border: "1px solid red",
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                  fontFamily: "Inter",
                                  fontWeight: 500,
                                }}
                              >
                                {material.material_name}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  : null}
                {!Component.lenth - 1 === index1 ? (
                  <div
                    // className="separator"
                    style={{
                      margin: 0,
                      marginRight: 10,
                      marginLeft: 0,
                      height: 75,
                      position: "relative",
                      top: 0,
                      border: "0.5px solid #727272",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: 25,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariantComponents;
