import "@google/model-viewer";
import { Typography } from "@material-ui/core";
import { Check, LinearScaleTwoTone, ThreeSixty } from "@material-ui/icons";
import React, { Component } from "react";
import share from "../../Assets/Images/sharebtn.png";
import vecto from "../../Assets/Images/vecto.png";
import searching from "../../Assets/Images/searching.png";
import arimage from "../../Assets/Images/ar_icon.png";
import hamburger from "../../Assets/Images/menu.png";
import closeIcon from "../../Assets/Images/cancelToggle.png";
import { API } from "../../Constants/APIs";
import { Navigate } from "react-router-dom";
import Geocode from "react-geocode";
import { Beforeunload } from "react-beforeunload";
import closeModal from "../../Assets/Images/closeModal.png";
import Modal from "react-awesome-modal";
import axios from "axios";
import { createRef } from "react";
// import Drawer from "./Drawer";
// import ContentStyleWrapper from "./ContentStyleWrapper";
import AnnotationBtns from "../AnnotationBtns";

import HotspotContentDrawer from "../HotspotContentDrawer";
import VariantComponents from "./VariantComponents";
import { fullHeightSupport } from "../../Helpers/fullHeight";
var pageVisibility = document.visibilityState;
const variantControllerHeight = 126;
export default class MobileModelDynamicViewer extends Component {
  constructor(props) {
    super(props);

    this.modelRef = createRef();
    this.annotBtnCloseCB = createRef();

    this.state = {
      showHotspot: {
        isTrue: false,
        data: {},
      },
      toggle: false,
      navClose: { right: "0px" },
      redirect: false,
      leftModels: false,
      leftDays: false,
      leftViews: false,
      productId: window.location.pathname.split("/")[2],

      // for geolocation
      lat: 0,
      long: 0,
      mobile: false,
      platform: "",
      city: "",
      country: "",
      ip: "",
      session: 0,
      count: 0,
      count1: 0,
      seconds: 0,
      checkCall: false,
      referrer: "",
    };
  }

  toggleMenu = () => {
    this.setState({
      toggle: true,
    });
  };

  componentDidMount() {
    this.props.ViewModal();
    window.addEventListener("blur", () => {
      this.postMobileAnalytics();
    });

    const referrer = document.referrer;
    // const referrer ="https://admin.actuality.live/admin/analytics/624d87e3cc0658544fec4425"
    if (referrer.length > 0) {
      let domain = referrer.split("/");
      domain = domain[0] + "//" + domain[2];
      // console.log(domain);
      this.setState({ referrer: domain }, () => {
        this.props.updateMobilePayload(this.state);
      });
      // console.log( referrer);
    } else {
      this.setState({ referrer: "N/A" }, () => {
        this.props.updateMobilePayload(this.state);
      });
    }
    // window.onbeforeunload = function(e) {
    //   // this.postAnalytics();
    //   // return;
    //   // if( queue not empty ) {
    //   //   return;
    //   // }
    //   var dialogText = 'Dialog text here';
    //   e.returnValue = dialogText;
    //   return dialogText;
    // };

    // console.log(this.props);
    let modelsLeft = this.props.leftModels;
    let daysLeft = this.props.leftDays;
    let viewsLeft = this.props.leftViews;
    if (modelsLeft === 0) {
      this.setState({
        redirect: true,
        leftModels: true,
      });
    } else if (daysLeft === 0) {
      this.setState({
        redirect: true,
        leftDays: true,
      });
    } else if (viewsLeft === 0) {
      this.setState({
        redirect: true,
        leftViews: true,
      });
    }

    this.geolocationData();
    this.getIPadd();
    // window.addEventListener("focus", this.onFocus);

    // document.addEventListener("click", () => {
    //   this.setState({ count: this.state.count + 1 }, () => {
    //     console.log(this.state.count);
    //   });
    // });

    this.interval = setInterval(() => {
      this.setState(
        {
          seconds: this.state.seconds + 1,
        },
        () => {
          this.props.updateMobilePayload(this.state);
        }
      );
    }, 1000);
  }
  // setUpModal = () => {
  //   var ModalView = document.querySelector("#model-viewer");
  //   ModalView.addEventListener("ar-status", (event) => {
  //     console.log("checkAR_status", event);
  //     if (event.detail.status === "failed") {
  //       const error = document.querySelector("#error");
  //       this.setState({ showError: true });
  //       error.classList.remove("hide");
  //       error.addEventListener("transitionend", (event) => {
  //         error.classList.add("hide");
  //       });
  //     }
  //   });
  // };
  componentWillUnmount() {
    // console.log("unmount");
    // window.removeEventListener("focus", this.onFocus);
  }

  // onFocus = () => {
  //   this.geolocationData();
  //   this.getIPadd();
  //   this.setState({checkCall: true}, ()=>{
  //     console.log("called");
  //   });
  //   // setTimeout(() => {
  //   // this.setState({checkCall: false});
  //   // }, 100);
  // };

  componentWillMount() {
    if (window.innerWidth < 750) {
      this.setState({ navClose: { right: "-370px" } });
    }
    if (window.innerWidth < 1199) {
      this.setState({ navClose: { right: "-770px" } });
    }
  }

  getIPadd = () => {
    axios
      .get("https://api.ipregistry.co/?key=uuxgl20sk80ku9fg")
      .then((resp) => {
        // console.log(resp);
        this.setState(
          {
            ip: resp.data.ip,
            platform: resp.data.user_agent.os.name,
            mobile: resp.data.user_agent.os.type === "mobile" ? true : false,
          },
          () => {
            this.props.updateMobilePayload(this.state);

            // console.log(this.state.ip, this.state.platform, this.state.mobile);
          }
        );
      })
      .catch((err) => {
        if (err) {
          // console.log(err.response);
        }
      });
  };

  geolocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getlocation,
        this.showError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  getlocation = (data) => {
    // console.log(data);
    let platformData = navigator;
    // console.log(platformData);
    this.setState(
      {
        lat: data.coords.latitude,
        long: data.coords.longitude,
        // mobile: platformData.userAgentData.mobile,
        // platform: platformData.userAgentData.platform,
      },
      () => {
        this.props.updateMobilePayload(this.state);
        // console.log(
        //   this.state.lat,
        //   this.state.long
        //   // this.state.mobile,
        //   // this.state.platform
        // );
        this.getCountryCityName(this.state.lat, this.state.long);
      }
    );
  };

  showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        // console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        // console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        // console.log("An unknown error occurred.");
        break;
    }
  };

  getCountryCityName = (lat, long) => {
    Geocode.setApiKey("AIzaSyAygBVHmaVFn9fNxUFauvrvt-HVxpcJ4wU");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    Geocode.fromLatLng(lat, long).then(
      (response) => {
        // console.log(response);
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        // console.log(city, state, country);
        // console.log(address);
        this.setState(
          {
            city,
            country,
          },
          () => {
            this.props.updateMobilePayload(this.state);

            // console.log(this.state.city, this.state.country);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  postMobileAnalytics = () => {
    let payLoadData = {
      product: this.state.productId,
      lat: this.state.lat,
      long: this.state.long,
      country: this.state.country,
      city: this.state.city,
      mobile: this.state.mobile,
      platform: this.state.platform,
      ip: this.state.ip,
      actionClicks: this.state.count,
      spaceClicks: this.state.count1,
      session: this.state.seconds,
      referrerBySession: this.state.referrer,
    };
    axios
      .post(API.postUrls.addAnalytics, payLoadData)
      .then((resp) => {
        // console.log(resp);
        // alert("post");
      })
      .catch((error) => {
        if (error) {
          // console.log(error.response);
        }
      });
  };

  openNav() {
    this.setState({ navClose: { right: "0px" }, openMainScreen: true });
  }
  closeNav() {
    this.setState({ navClose: { right: "-770px" } });
  }

  redirectToUrl = () => {
    if (this.props.UrlDescription) {
      window.open(this.props.UrlDescription);
    }
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Navigate
          to="../pageNotFound"
          state={{
            cancelled: this.state.cancelled,
            leftModels: this.state.leftModels,
            leftDays: this.state.leftDays,
            leftViews: this.state.leftViews,
          }}
        />
      );
    } else {
      const props = this.props;

      return (
        <div
          className="mobileResponsiveViewer"
          style={{
            height: "100%",
            boxSizing: "border-box",
            border: "0px solid red",
            position: "relative",
            ...fullHeightSupport(this.props.isMdOrDown),
          }}
        >
          <HotspotContentDrawer
            open={this.state.showHotspot.isTrue}
            onClose={() => {
              this.setState({
                showHotspot: { isTrue: false, data: {} },
              });
              this.annotBtnCloseCB.current();
              this.annotBtnCloseCB.current = null;
            }}
            title={this.state.showHotspot.data.title}
            description={this.state.showHotspot.data.description}
          />
          {props.selectedVariant.usdz_file_url ? (
            <model-viewer
              ref={(elem) => {
                this.modelRef.current = elem;
              }}
              id="model-viewer"
              src={
                props.showVariant
                  ? API.imgUrl + props.selectedVariant.model_file_url
                  : API.imgUrl + props.model
              }
              ios-src={API.imgUrl + props.selectedVariant.usdz_file_url}
              camera-controls
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="auto"
              ar-placement="floor"
              autoplay
              touch-action="none"
              loading="eager"
              style={{
                background: "#FFFFFF",
                height: window.innerHeight - variantControllerHeight - 40,
                width: "100vw",
              }}
            >
              <AnnotationBtns
                annots={this.props?.selectedVariant?.hotspots}
                openHotspotDrawer={(annot, cb) => {
                  this.annotBtnCloseCB?.current?.();
                  this.annotBtnCloseCB.current = cb;
                  this.modelRef.current.setAttribute(
                    "camera-target",
                    annot.cameraTarget
                  );
                  this.modelRef.current.setAttribute(
                    "camera-orbit",
                    annot.cameraOrbit
                  );
                  this.modelRef.current.setAttribute("zoom", annot?.zoom || 12);
                  this.setState({
                    showHotspot: {
                      isTrue: true,
                      data: {
                        title: annot.title,
                        description: annot.description,
                      },
                    },
                  });
                }}
              />
              <button
                slot="ar-button"
                className="viewInYourSpace"
                style={{
                  bottom: 0,
                  transform: "translate(-50%,50%) ",
                }}
                onClick={() => {
                  this.setState(
                    {
                      checkCall: true,
                      count1: this.state.count1 + 1,
                    },
                    () => {
                      this.props.updateMobilePayload(this.state);
                    }
                  );
                }}
              >
                <img src={arimage} width="20px" alt="" />
                <p className="view_space_btn">
                  {" "}
                  {this.props.language === "French"
                    ? "Voir dans votre espace"
                    : "View in your space"}
                </p>
              </button>
            </model-viewer>
          ) : (
            <model-viewer
              ref={(elem) => {
                this.modelRef.current = elem;
              }}
              touch-action="pan-y"
              id="model-viewer"
              src={
                props.showVariant
                  ? API.imgUrl + props.selectedVariant.model_file_url
                  : API.imgUrl + props.model
              }
              camera-controls
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="auto"
              ar-placement="floor"
              autoplay
              loading="eager"
              style={{
                background: "#FFFFFF",
                height: window.innerHeight - variantControllerHeight - 40,
                width: "100vw",
              }}
            >
              <AnnotationBtns
                annots={this.props?.selectedVariant?.hotspots}
                openHotspotDrawer={(annot, cb) => {
                  this.annotBtnCloseCB?.current?.();
                  this.annotBtnCloseCB.current = cb;
                  this.modelRef.current.setAttribute(
                    "camera-target",
                    annot.cameraTarget
                  );
                  this.modelRef.current.setAttribute(
                    "camera-orbit",
                    annot.cameraOrbit
                  );
                  this.modelRef.current.setAttribute("zoom", annot?.zoom || 12);
                  this.setState({
                    showHotspot: {
                      isTrue: true,
                      data: {
                        title: annot.title,
                        description: annot.description,
                      },
                    },
                  });
                }}
              />
              <button
                slot="ar-button"
                className="viewInYourSpace"
                style={{
                  bottom: 0,
                  transform: "translate(-50%,50%) ",
                }}
                onClick={() => {
                  this.setState(
                    {
                      checkCall: true,
                      count1: this.state.count1 + 1,
                    },
                    () => {
                      this.props.updateMobilePayload(this.state);
                    }
                  );
                }}
              >
                <img src={arimage} width="20px" alt="" />
                <p className="view_space_btn">
                  {this.props.language === "French"
                    ? "Voir dans votre espace"
                    : "View in your space"}
                </p>
              </button>
            </model-viewer>
          )}
          {this.state.showHotspot.isTrue ? null : (
            <div
              className="menuHamburger"
              style={{
                border: "0px solid blue",
                top: 10,
              }}
            >
              <img
                src={hamburger}
                onClick={this.toggleMenu}
                alt=""
                style={{ width: "100%", border: "0px solid red" }}
              />
            </div>
          )}
          {this.props.productLogo ? (
            <div
              className="modelCompanyLogo"
              style={{
                width: 79,
                height: 79,
                top: 10,
                position: "absolute",
                border: "0px solid red",
                left: 10,
              }}
            >
              <img
                src={API.imgUrl + this.props.productLogo}
                alt=""
                style={{
                  width: 79,
                  height: 79,
                  borderRadius: 8,
                }}
              />
            </div>
          ) : (
            ""
          )}
          <VariantComponents
            variantControllerHeight={variantControllerHeight}
            Component={this.props.Component}
            selectMaterial={this.props.selectMaterial}
            checkSelected={this.props.checkSelected}
          />

          <div
            className="poweredBy"
            style={{
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <a
              href="https://actuality.live/"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "#000000",
              }}
            >
              powered by <b style={{ color: "#000" }}>actuality.live</b>
            </a>
          </div>
          {this.state.toggle ? (
            <>
              <div className="sideBar" style={{ overflowX: "hidden" }}>
                <div className="productName">
                  <div
                    className="closeToggle"
                    style={{
                      overflowX: "hidden",
                      cursor: "pointer",
                      zIndex: "99999",
                    }}
                    onClick={() =>
                      this.setState(
                        {
                          toggle: false,
                        },
                        () => {
                          // console.log(this.state.toggle);
                        }
                      )
                    }
                  >
                    <img src={closeIcon} style={{ width: "16px" }} />
                  </div>
                  <h5 className="prd1">
                    <Typography className="buyNow" style={{ paddingTop: 0 }}>
                      {props.product ? props.product : ""}
                      <br />
                    </Typography>
                    <Typography>
                      {props.productSubTitle ? props.productSubTitle : ""}
                      <br />
                    </Typography>
                  </h5>
                </div>

                <div className="callToAction">
                  <h5 className="prd">
                    {this.props.visibility ? (
                      <>
                        <Typography
                          className="buyNow"
                          style={{ paddingTop: "0px" }}
                          onClick={() => {
                            this.props.openLink();
                            // this.redirectToUrl()
                            this.setState(
                              { count: this.state.count + 1 },
                              () => {
                                this.props.updateMobilePayload(this.state);

                                // console.log(this.state.count);
                              }
                            );
                          }}
                        >
                          {props.UrlTitle ? props.UrlTitle : "Buy Now"}
                          <br />
                        </Typography>
                        <Typography
                          // className="buyNow"
                          onClick={() => {
                            this.props.updateMobilePayload(this.state);

                            this.props.openLink();
                            // this.redirectToUrl();
                          }}
                        >
                          {props.UrlDescription ? props.UrlDescription : ""}
                          <br />
                        </Typography>
                      </>
                    ) : (
                      ""
                    )}
                  </h5>
                </div>

                {/* <div className="variants">
                    <div
                      style={{
                        height: "auto",
                        width: window.innerWidth,
                      }}
                    >
                      <div className="framesWrapper">
                        {props.Component.map((single, index1) => (
                          <div style={{ paddingLeft: "20px" }}>
                            <Typography style={{ marginLeft: 6, letterSpacing: "-1px" }}>
                              {single.component_name}
                            </Typography>

                            <div className="variantListing"
                              style={{
                                width: "255px",
                                overflowX: "hidden",
                                display: "grid", gridTemplateColumns: "33% 33% 33%"
                              }}
                            >
                              {single.materials[0]._id
                                ? single.materials.map((material, index) => (
                                  <div>
                                    {material.material_type === "color" ? (
                                      <>
                                        <div
                                          onClick={() => {
                                            this.props.selectMaterial(
                                              material._id,
                                              single._id
                                            );
                                          }}
                                          className="paletteBox"
                                          style={{
                                            width: "50px",
                                            backgroundColor: material.material_value,
                                          }}
                                          key={index}
                                        >
                                          {this.props.checkSelected(
                                            material._id,
                                            single._id
                                          ) ? (
                                            <div className="selected">
                                              <Check style={{ color: "#000" }} />
                                            </div>
                                          ) : null}
                                        </div>
                                        <div style={{ textAlign: "left", fontSize: "14px", fontFamily: "Inter", paddingLeft: "15px" }}>
                                          {material.material_name}
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div className="paletteBox">
                                          <img
                                            onClick={() => {
                                              this.props.selectMaterial(
                                                material._id,
                                                single._id
                                              );
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
                                          {this.props.checkSelected(
                                            material._id,
                                            single._id
                                          ) ? (
                                            <div className="selected">
                                              <Check style={{ color: "#000" }} />
                                            </div>
                                          ) : null}
                                        </div>
                                        <div style={{ textAlign: "left", fontSize: "14px", fontFamily: "Inter", paddingLeft: "15px" }}>
                                          {material.material_name}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ))
                                : null}
                              
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> */}

                {/* <div
                    className="shareBtnResp"
                    style={{ position: "relative", top: "28%", left: "74%" }}
                    onClick={() => {
                      this.setState({
                        toggle: false
                      });
                      this.props.visibleModal();
                    }}
                  >
                    <img src={vecto} height={"20px"} alt="" />&nbsp;
                    <img src={searching} height={"20px"} alt="" />&nbsp;
                    <img src={share} height={"20px"} alt="" style={{ cursor: "pointer" }} />
                  </div>
                  <div className="shareBtn">
                    <LinearScaleTwoTone />
                  </div> */}
              </div>
              {/* </ClickAwayListener> */}
            </>
          ) : (
            ""
          )}
          {props.showARError && (
            <div id="error">
              {/* <Modal
                    visible={props.showARError}
                    width="200"
                    height="200"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                  > */}
              <div
                style={{
                  backgroundColor: "#ffffffdd",
                  borderRadius: "16px",
                  paddingTop: "35px",
                  padding: "16px",
                  position: "fixed",
                  // left: "55px",
                  left: "50%",

                  // top: "250px",
                  top: "50%",
                  zIndex: 9999,
                  height: "100px",
                  width: "250px",
                  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                  paddingLeft: "15px",
                  fontFamily: "Inter",
                  transform: "translateX(-50%) translateY(-50%) ",
                  border: "0px solid red",
                }}
              >
                <p style={{ color: "#000", paddingLeft: "18px" }}>
                  <img
                    src={closeModal}
                    alt=""
                    style={{
                      width: 20,
                      height: 20,
                      position: "absolute",
                      right: 10,
                      top: 10,
                      fontSize: 20,
                    }}
                    onClick={() => {
                      this.setState({ showARError: false });
                      window.location.reload();
                    }}
                  />
                  Hey! It looks like your device doesn't support AR. Please{" "}
                  <a
                    href="https://arcade.ltd/is-my-device-ar-compatible/"
                    target={"_blank"}
                    style={{ color: "#000" }}
                  >
                    CLICK HERE
                  </a>{" "}
                  to check the supported device list.
                </p>
              </div>
              {/* </Modal> */}
            </div>
          )}
        </div>
        // </Beforeunload>
      );
    }
  }
}
const Lorem = () => (
  <>
    <h1>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. At sed libero
      officia excepturi optio porro nobis animi vero quae minus, deserunt
      perspiciatis autem obcaecati placeat et magni possimus, ex ad!
    </h1>
    <br />
  </>
);
