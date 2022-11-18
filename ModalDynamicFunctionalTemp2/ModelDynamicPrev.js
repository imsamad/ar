import "@google/model-viewer";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import axios from "axios";
import QRCode from "qrcode.react";
import qs from "query-string";
import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Lottie from "react-lottie";
import "../App.scss";
import arimage from "../Assets/Images/ar_icon.png";
import rotate from "../Assets/Images/rotate.png";
// import share from "../Assets/Images/share.png";
import share from "../Assets/Images/sharebtn.png";
import zoom from "../Assets/Images/zoom-in.png";
import loader from "../Assets/lottie/3dloader.json";
import MobileModelDynamicViewer from "../Components/MobileModelDynamicViewer";
import { API } from "../Constants/APIs";
import logo from "../Assets/Images/actualityLogo.png";
import init from "../Helpers/Windotoken";
import NotFoundPage from "./NotFoundPage";
import { Navigate } from "react-router-dom";
import Geocode from "react-geocode";
import { Beforeunload } from "react-beforeunload";
import remove from "../Assets/Images/delete.png";
import arrowLeft from "../Assets/Images/arrowLeft.png";
import arrowRight from "../Assets/Images/arrowRight.png";
import closeModal from "../Assets/Images/closeModal.png";
import ShareMobileModal from "../Components/ShareMobileModal";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import modal_Viewer from "../Components/Constant";
// import Cookies from "universal-cookie";
// import CookieConsent from "react-cookie-consent";

const screen = window.screen.width <= 1024 ? "mobile" : "desktop";
const queryParams = new URLSearchParams(window.location.search);
export default class ModalDynamic extends Component {
  constructor() {
    super();
    this.state = {
      model: {},
      productDel: {},
      variantIndex: 0,
      revealModel: false,
      mesh: [],
      Components: [],
      frames: [],
      selected_material_id: 0,
      selected_component_id: "",
      showModalBtn: screen === "desktop",
      showVariant: false,
      selectedVariant: {},
      meshes: [],
      Variants: [],
      model_file_url: "",
      ModalImage: "",
      usdzImage: "",
      productId: window.location.pathname.split("/")[2],
      variantsCombo: [],
      Component1: [],
      Component2: [],
      visible: false,
      value: "",
      embedCode: "",
      QRCode: "",
      copied: false,
      qrCopy: false,
      embedCopy: false,
      selectedMaterials: [],
      screen: qs.parse(window.location.search).screen
        ? qs.parse(window.location.search).screen
        : screen,
      visiblity: true,
      productStatus: "",
      redirect: false,
      cancelled: false,
      leftModels: false,
      leftDays: false,
      leftViews: false,
      productName: "",
      language: "",
      showARError: false,

      // for geolocation
      lat: 0,
      long: 0,
      mobile: false,
      platform: "",
      city: "",
      country: "",
      ip: "",
      clicks: 0,
      session: 0,
      count: 0,
      count1: 0,
      seconds: 0,
      referrer: "",
      checkCall: false,
      modalVisible: false,
      shareUrl: "",
      heightModal: "150px",
      widthModal: "50%",
    };
  }

  componentDidMount() {
    console.log("ModalDynamic", this.props);
    const referrer = document.referrer;

    console.log("referrer", document.referrer);
    // const referrer ="https://admin.actuality.live/admin/analytics/624d87e3cc0658544fec4425"
    if (referrer.length > 0) {
      let domain = referrer.split("/");
      domain = domain[0] + "//" + domain[2];
      console.log(domain);
      this.setState({ referrer: domain });
      // console.log( referrer);
    } else {
      this.setState({ referrer: "N/A" });
    }

    // window.addEventListener("beforeunload",(e)=>{
    //   e.preventDefault();
    //   alert("Are you sure to close this tab?")
    // })

    // window.onbeforeunload = function (e) {
    //   // this.postAnalytics();
    //   // return;
    //   // if( queue not empty ) {
    //   //   return;
    //   // }
    //   var dialogText = "Dialog text here";
    //   e.returnValue = dialogText;
    //   return dialogText;
    // };

    if (this.state.mobile === false) {
      this.geolocationData();
      this.getIPadd();
    }

    // document.addEventListener("click", () => {
    //   this.setState({ count: this.state.count + 1 }, () => {
    //     console.log(this.state.count);
    //   });
    // });
    if (this.state.mobile === false) {
      this.interval = setInterval(() => {
        this.setState({
          seconds: this.state.seconds + 1,
        });
      }, 1000);
    }

    // console.log(queryParams.get("self"));
    var payId = window.location.pathname.split("/")[2];
    axios.get(API.getUrls.getSingleProduct + payId).then((resp) => {
      console.log("hi", resp);
      this.setState({ language: resp.data.product.language });
      if (
        resp.data.product.user.is_delete === "yes" ||
        resp.data.product.user.status === "draft"
      ) {
        this.setState({
          redirect: true,
        });
      } else {
        if (resp.data.product.status === "published") {
          axios
            .get(API.getUrls.getSubscriptionDetail + payId)
            .then((respPlan) => {
              console.log(respPlan);
              if (respPlan.data.status === "success") {
                let modelsLeft = respPlan.data.data.no_of_models_left;
                let daysLeft = respPlan.data.data.no_of_days_left;
                let viewsLeft = respPlan.data.data.no_of_views_left;

                // if(respPlan.data.data.order_status==="cancelled")
                // {
                //   this.setState({
                //     redirect: true,
                //     cancelled: true
                //   })
                // }
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

                let payLoad = {
                  prodId: payId,
                };

                // if(queryParams.get('self')==true)
                // {
                axios
                  .put(API.getUrls.websiteViews, payLoad)
                  .then((resViews) => {
                    console.log(resViews);
                  });
                // }
              }
            });
          // console.log(payId);
          // axios.get(API.getUrls.getSingleProduct + payId).then((resp) => {
          console.log(resp);
          // console.log(resp.data.product.status);
          if (resp.data.status === "success") {
            this.setState({
              visiblity: resp.data.product.visibility,
              productStatus: resp.data.product.status,
            });

            if (this.state.productStatus === "published") {
              this.setState({
                embedCode:
                  "<iframe src='" +
                  "https://actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id +
                  "' title='some' scrolling='No' height='750px' width='100%' frameborder='0'></iframe>",
                value:
                  "https://actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id,
                QRCode:
                  "https://actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id,
                shareUrl: modal_Viewer(this.props.matchparams.id),
              });

              this.setModel();
              this.getComponents();
              this.getVariants();
              // this.postViews();
            } else {
              this.setState({
                embedCode:
                  "<iframe src='" +
                  "https://portal.actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id +
                  "' title='some' scrolling='No' height='750px' width='100%' frameborder='0'></iframe>",
                value:
                  "https://portal.actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id,
                QRCode:
                  "https://portal.actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id,
                shareUrl:
                  "<iframe src='" +
                  "http://localhost:3000/share/" +
                  this.props.matchparams.id +
                  "' title='some' scrolling='No' height='750px' width='100%' frameborder='0'></iframe>",
              });
              this.setModel();
              // this.getComponents();
              this.getVariants();
              // this.postViews();
            }
          }
          // });
        } else {
          this.setState({
            redirect: true,
          });
        }
      }
    });
  }
  button = () => {
    return (
      <button
        style={{ height: "100px", width: "100px", backgroundColor: "red" }}
      >
        {" "}
        View 3D Modal
      </button>
    );
  };
  componentWillUnmount() {
    this.postAnalytics();
    if (this.state.mobile === false) {
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
            console.log(this.state.ip, this.state.platform, this.state.mobile);
          }
        );
      })
      .catch((err) => {
        if (err) {
          console.log(err.response);
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
    console.log(data);
    let platformData = navigator;
    console.log(platformData);
    this.setState(
      {
        lat: data.coords.latitude,
        long: data.coords.longitude,
        // mobile: platformData.userAgentData.mobile,
        // platform: platformData.userAgentData.platform,
      },
      () => {
        console.log(
          this.state.lat,
          this.state.long
          // this.state.mobile,
          // this.state.platform
        );
        this.getCountryCityName(this.state.lat, this.state.long);
      }
    );
  };

  showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
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
        console.log(response);
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
            console.log(this.state.city, this.state.country);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  postAnalytics = () => {
    // let payLoad = {
    //   prodId: this.state.productId,
    // };

    // // if(queryParams.get('self')==true)
    // // {
    // axios.put(API.getUrls.websiteViews, payLoad).then((resViews) => {
    //   console.log(resViews);
    // });

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

    // if (this.state.mobile === false) {
    axios
      .post(API.postUrls.addAnalytics, payLoadData)
      .then((resp) => {
        console.log(resp);
        // alert("post");
      })
      .catch((error) => {
        if (error) {
          console.log(error.response);
        }
      });
    // }
  };

  postViews = () => {
    // if (init() === "success") {
    axios
      .post(API.postUrls.postViews + "/" + this.props.matchparams.id)
      .then((res) => {});
    // }
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };
  closeModal = () => {
    this.setState({
      visible: false,
    });
  };
  buttonStyle = () => {
    return (
      <button
        style={{
          height: "100px",
          width: "100px",
          backgroundColor: "red",
        }}
      >
        View 3D Modal
      </button>
    );
  };
  setUpModal = () => {
    var modal = document.getElementById("myModal");
    var modalContent = document.querySelector(".modal-content");

    var btn = document.getElementById("qrtext");
    var ModalView = document.querySelector("#model-viewer");
    var span = document.getElementsByClassName("closeBtn")[0];
    ModalView.addEventListener("ar-status", (event) => {
      console.log("checkAR_status", event);
      if (event.detail.status === "failed") {
        const error = document.querySelector("#error");
        this.setState({ showARError: true });
        error.classList.remove("hide");
        error.addEventListener("transitionend", (event) => {
          error.classList.add("hide");
        });
      }
    });
    if (btn) {
      btn.onclick = function () {
        modal.style.display = "block";
        modalContent.classList.add("slideIn");
      };
    }

    span.onclick = function () {
      modalContent.classList.remove("slideIn");
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modalContent.classList.remove("slideIn");
        modal.style.display = "none";
      }
    };
  };

  setModel = () => {
    axios
      .get(API.getUrls.getProducts + "/" + this.props.matchparams.id)
      .then((res) => {
        console.log(res);
        this.setState(
          {
            productDel: res.data.product,
            productName: res.data.product.title,
            revealModel: true,
          },
          () => {
            this.setUpModal();
          }
        );
      });
  };
  getComponents = () => {
    axios
      .get(
        API.getUrls.getComponents +
          this.props.matchparams.id +
          "?page=1&limit=10"
      )
      .then((res) => {
        console.log("component", res);
        this.setState(
          {
            Components: res.data.components.docs,
          },
          () => {
            let selectedMaterials = [];
            if (this.state.selectedVariant.materials) {
              this.state.Components.forEach((component) => {
                component.materials.forEach((item, i) => {
                  if (
                    item._id === this.state.selectedVariant.materials[0]._id
                  ) {
                    component.materials.splice(i, 1);
                    component.materials.unshift(item);
                  }
                });
                console.log(component.materials);
                console.log(this.state.selectedVariant.materials[0]._id);
                const _material = component.materials.find(
                  (mat) =>
                    mat._id === this.state.selectedVariant.materials[0]._id
                );
                console.log(_material);
                selectedMaterials.push({
                  material: _material
                    ? _material._id
                    : component.materials[0]._id,
                  component: component._id,
                });
              });
              this.setState({ selectedMaterials });
            }
          }
        );
      });
  };
  getVariants = () => {
    axios
      .get(
        API.getUrls.variants +
          "?page=1&limit=10&product=" +
          this.props.matchparams.id
      )
      .then((res) => {
        console.log("variant", res);
        if (res.data.docs.length > 0) {
          this.setState(
            {
              Variants: res.data.docs,
              selectedVariant: res.data.docs[0],
              ModalImage: res.data.docs[0].model_file_url,
              usdzImage: res.data.docs[0].usdz_file_url,
            },
            () => {
              this.getComponents();
            }
            // ,
            // () => {
            //   console.log('selectedVariant',this.state.selectedVariant);
            //   console.log("ModalImage",this.state.ModalImage);
            // }
          );
        }
      });
  };

  selectMaterial = (matId, compId) => {
    // console.log("zzzz",matId, compId);
    const selectedMaterials = [];
    this.state.selectedMaterials.forEach((item) => {
      selectedMaterials.push({
        material: compId === item.component ? matId : item.material,
        component: item.component,
      });
    });
    this.setState(
      {
        selectedMaterials,
      },
      () => {
        this.applyChanges();
      }
    );
  };

  checkSelected = (matId, comId) => {
    const material = this.state.selectedMaterials.find(
      (item) => item.component === comId && item.material === matId
    );
    return material ? true : false;
  };

  selectVariant = (variant) => {
    this.setState({ selectedVariant: variant });
  };
  applyChanges = () => {
    let filteredVariant = {};
    let totalSelected = this.state.selectedMaterials.length;
    this.state.Variants.forEach((variant) => {
      const materials = variant.materials.filter((material) =>
        this.state.selectedMaterials.some(
          (item) =>
            item.material === material._id &&
            material.component === item.component
        )
      );
      if (materials.length === totalSelected) {
        filteredVariant = variant;
      }
    });
    this.setState({
      selectedVariant: filteredVariant,
      showVariant: true,
    });
  };
  downloadQR = () => {
    const canvas = document.getElementById("QRCode");
    const pngUrl = canvas
      .toDataURL(window.location.href)
      .replace(window.location.href, window.location.href);
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  redirectToUrl = () => {
    if (this.state.productDel.link_url) {
      window.open(this.state.productDel.link_url);
    }
  };
  copyUrl = (e) => {
    this.setState({
      copied: true,
    });
    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, 2000);
  };
  copyShare = () => {
    this.setState({
      copyShareUrl: true,
    });
    setTimeout(() => {
      this.setState({
        copyShareUrl: false,
      });
    }, 2000);
  };
  // gotoShare = () => {
  //   this.setState({
  //     copied: true,
  //   });
  //   setTimeout(() => {
  //     this.setState({
  //       copied: false,
  //     });
  //   }, 2000);

  //   // setTimeout(() => {
  // window.open("/share/" + this.props.matchparams.id, "_blank");
  //   // }, 2000);
  // };
  gotoShare() {
    window.open("/share/" + this.props.matchparams.id, "_blank");

    // var iframe1 = document.getElementById("myiFrame");
    // iframe1.style.display = "block";
  }
  copyEmbed = (e) => {
    this.setState({
      embedCopy: true,
    });
    setTimeout(() => {
      this.setState({
        embedCopy: false,
      });
    }, 2000);
  };

  updateMobilePayload = (data) => {
    this.setState({
      product: data.productId,
      lat: data.lat,
      long: data.long,
      country: data.country,
      city: data.city,
      mobile: data.mobile,
      platform: data.platform,
      ip: data.ip,
      actionClicks: data.count,
      spaceClicks: data.count1,
      session: data.seconds,
      referrerBySession: data.referrer,
      checkCall: data.checkCall,
    });
  };
  // cookies =() => {
  //   const cookies = new Cookies();
  //   cookies.set("myCat", "Pacman", { path: "/" });
  // }

  render() {
    /**
     * If is FROM_SHARE_PAGE
     * hide extra non-essential data or UI elements
     *
     */
    const FROM_SHARE_PAGE = this.props.FROM_SHARE_PAGE;

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
      const model = this.state.model;
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      return (
        <Beforeunload
          onBeforeunload={() => {
            // if(!this.state.mobile){
            if (!this.state.checkCall) {
              this.postAnalytics();
            } else {
              this.setState({ checkCall: false });
            }
          }}
        >
          <div
            className="modelViewer"
            style={{
              border: "0px solid aqua",
              padding: this.state.screen === "desktop" ? "0 24px" : 0,
              height: "100vh",
            }}
          >
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <div style={{ margin: "auto" }}></div>

            {this.state.screen === "desktop" ? (
              <>
                {this.state.revealModel ? (
                  <Grid
                    container
                    spacing={4}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    <Grid
                      item
                      sm={9}
                      style={{
                        height: "95vh",
                        position: "relative",
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                    >
                      <model-viewer
                        id="model-viewer"
                        exposure={model.exposure}
                        scale={1}
                        src={
                          this.state.showVariant
                            ? API.imgUrl +
                              this.state.selectedVariant.model_file_url
                            : API.imgUrl + this.state.ModalImage
                        }
                        shadow-intensity={model.shadow_intensity}
                        quick-look-browsers="safari chrome"
                        min-field-of-view={
                          window.innerWidth < 600 ? "90deg" : "55deg"
                        }
                        max-field-of-view={
                          window.innerWidth < 600 ? "90deg" : "55deg"
                        }
                        bounds="tight"
                        data-js-focus-visible
                        camera-controls
                        ar-scale={"auto"}
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        ar-placement={"floor"}
                        autoplay
                        loading="lazy"
                        environment-image="neutral"
                        style={{
                          background: "#fff",
                          boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.1)",
                          borderRadius: "15px",
                          height: "95vh",
                          width: "-webkit-fill-available",
                          position: "relative",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {this.state.showARError && (
                          <div id="error" className="hide">
                            <p
                              style={{
                                backgroundColor: "#ffffffdd",
                                borderRadius: "16px",
                                padding: "16px",
                                position: "absolute",
                                left: "60px",
                                top: "200px",
                                zIndex: 9999,

                                boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                                color: "#000",
                                fontFamily: "Inter",
                              }}
                            >
                              AR is not supported on this device.
                            </p>
                          </div>
                        )}

                        <Typography className="brand">
                          {this.state.productDel.product_logo ? (
                            <div className="modelCompanyLogo">
                              <img
                                src={
                                  API.imgUrl +
                                  this.state.productDel.product_logo
                                }
                                alt=""
                                style={{ width: "100%", borderRadius: 15 }}
                                width="112"
                                height="112"
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </Typography>

                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                          slot="poster"
                        >
                          <Lottie
                            options={defaultOptions}
                            height={100}
                            width={100}
                            autoplay
                            loop
                          />
                          <h2 style={{ textAlign: "center" }}>Loading...</h2>
                        </div>
                        <button
                          slot="ar-button"
                          style={{
                            backgroundColor: "transparent",
                            borderRadius: "4px",
                            border: "none",
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                            position: "absolute",
                            top: 12,
                            right: "16px",
                            background: "#fff",
                          }}
                          onClick={() => {
                            this.setState(
                              { count1: this.state.count1 + 1 },
                              () => {
                                console.log(this.state.count1);
                              }
                            );
                          }}
                        >
                          <div style={{}}>
                            <img
                              src={arimage}
                              width="20px"
                              alt=""
                              style={{
                                marginRight: "4px",
                                position: "relative",
                                top: 5,
                              }}
                            />
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                display: "inline-block",
                              }}
                            >
                              {this.state.language === "French"
                                ? "Le rover devant vous"
                                : "View in your space"}
                            </p>
                          </div>
                        </button>
                        <div className="iconWrapper">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div>
                              <a
                                href="https://actuality.live/"
                                target="_blank"
                                style={{
                                  textDecoration: "none",
                                  color: "#000000",
                                }}
                              >
                                <h5
                                  style={{
                                    marginLeft: "15px",
                                    color: "#565656",
                                    fontWeight: "400",
                                    cursor: "pointer",
                                    fontSize: "15px",
                                    marginBottom: 21,
                                  }}
                                >
                                  {this.state.language === "French"
                                    ? "AlimentÃ© par"
                                    : "Powered By"}{" "}
                                  <b>actuality.live</b>
                                </h5>
                              </a>
                            </div>
                          </div>
                          <span>
                            <img
                              src={rotate}
                              alt=""
                              style={{ width: "40px", height: "40px" }}
                            />
                            <img src={zoom} width={"32px"} alt="" />

                            {!FROM_SHARE_PAGE && (
                              <img
                                src={share}
                                style={{ cursor: "pointer" }}
                                height={"24px"}
                                alt=""
                                onClick={() => {
                                  this.openModal();
                                }}
                              />
                            )}
                          </span>
                        </div>
                      </model-viewer>
                    </Grid>

                    <Grid
                      sm={3}
                      style={{
                        position: "relative",
                        height: "95vh",
                        boxSizing: "border-box",
                        paddingLeft: 10,
                        border: "0px solid red",
                      }}
                    >
                      <>
                        {!FROM_SHARE_PAGE && (
                          <ModelDescription
                            title={this.state?.productDel?.title}
                            sub_title={this.state?.productDel?.sub_title}
                          />
                        )}

                        {this.state.visiblity ? (
                          <div
                            className="cardPreview"
                            onClick={() => {
                              this.redirectToUrl();
                              this.setState(
                                { count: this.state.count + 1 },
                                () => {
                                  console.log(this.state.count);
                                }
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <Typography
                              gutterBottom
                              className="buyNowPreview"
                              onClick={() => {
                                this.redirectToUrl();
                              }}
                              style={{ fontWeight: 500, cursor: "pointer" }}
                            >
                              {this.state.productDel.link_title
                                ? this.state.productDel.link_title
                                : "Buy Now"}
                            </Typography>
                            <p
                              className="buy_subPreview"
                              style={{ cursor: "pointer" }}
                            >
                              {this.state.productDel.link_description
                                ? this.state.productDel.link_description
                                : "From Someweb.com"}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </>

                      <div className="">
                        {this.state.Components.map((single, index1) => (
                          <div className="card">
                            <div className="variant_head_wrapper">
                              <Typography
                                gutterBottom
                                className="buyNowPreview"
                                style={{ lineHeight: "40px", fontWeight: 500 }}
                              >
                                {single.component_name}
                              </Typography>
                            </div>
                            <div className="fixBox">
                              {single.materials[0]._id
                                ? single.materials.map((material, index) => (
                                    <div>
                                      {material.material_type === "color" ? (
                                        <>
                                          <div
                                            onClick={() => {
                                              this.selectMaterial(
                                                material._id,
                                                single._id
                                              );
                                            }}
                                            className="paletteBox"
                                            style={{
                                              backgroundColor:
                                                material.material_value,
                                              margin: "16px 20px 16px 9px",
                                            }}
                                            key={index}
                                          >
                                            {this.checkSelected(
                                              material._id,
                                              single._id
                                            ) ? (
                                              <div className="selected">
                                                <Check
                                                  style={{ color: "#000" }}
                                                />
                                              </div>
                                            ) : null}
                                          </div>
                                          <div
                                            style={{
                                              inlineSize: "58px",
                                              overflowWrap: "break-word",
                                            }}
                                          >
                                            <p
                                              style={{
                                                textAlign: "center",
                                                fontSize: "14px",
                                                fontFamily: "Inter",
                                                width: "78px",
                                                marginTop: "-6px",
                                                marginLeft: "-4px",
                                              }}
                                            >
                                              {material.material_name}
                                            </p>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          <div
                                            className="paletteBox"
                                            style={{
                                              margin: "16px 20px 16px 9px",
                                            }}
                                          >
                                            <img
                                              onClick={() => {
                                                this.selectMaterial(
                                                  material._id,
                                                  single._id
                                                );
                                              }}
                                              key={index}
                                              src={
                                                API.imgUrl +
                                                material.material_value
                                              }
                                              className="paletteBox"
                                              style={{
                                                marginTop: "0px",
                                                marginLeft: "0px",
                                              }}
                                              alt=""
                                            />
                                            {this.checkSelected(
                                              material._id,
                                              single._id
                                            ) ? (
                                              <div className="selected">
                                                <Check
                                                  style={{ color: "#000" }}
                                                />
                                              </div>
                                            ) : null}
                                          </div>

                                          <div
                                            style={{
                                              inlineSize: "58px",
                                              overflowWrap: "break-word",
                                            }}
                                          >
                                            <p
                                              style={{
                                                textAlign: "center",
                                                fontSize: "14px",
                                                fontFamily: "Inter",
                                                width: "78px",
                                                // marginTop:
                                                //   material.material_type ===
                                                //   "color"
                                                //     ? "-6px"
                                                //     : "6px",
                                                marginTop: "-6px",
                                                marginLeft: "-4px",
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
                            </div>
                          </div>
                        ))}
                      </div>

                      {this.state.showModalBtn ? (
                        <div
                          id="qrtext"
                          style={{ bottom: 0 }}
                          onClick={() => {
                            this.setState(
                              { count1: this.state.count1 + 1 },
                              () => {
                                console.log(this.state.count1);
                              }
                            );
                          }}
                        >
                          <img
                            src={arimage}
                            width="24px"
                            alt=""
                            style={{ marginRight: "4px" }}
                          />
                          <p className="view_space_btn">
                            {" "}
                            {this.state.language === "French"
                              ? "Le rover devant vous"
                              : "View in your space"}
                          </p>
                        </div>
                      ) : null}
                    </Grid>
                  </Grid>
                ) : null}
              </>
            ) : (
              <MobileModelDynamicViewer
                model={this.state.ModalImage}
                visibility={this.state.visiblity}
                product={this.state.productName}
                productSubTitle={
                  this.state.productDel
                    ? this.state.productDel.sub_title === "undefined"
                      ? null
                      : this.state.productDel.sub_title
                    : ""
                }
                Component={this.state.Components}
                companyLogo={
                  this.state.productDel.user
                    ? this.state.productDel.user.company_logo
                    : ""
                }
                productLogo={
                  this.state.productDel
                    ? this.state.productDel.product_logo
                    : ""
                }
                showARError={this.state.showARError}
                selectMaterial={this.selectMaterial}
                checkSelected={this.checkSelected}
                showVariant={this.state.showVariant}
                selectedVariant={this.state.selectedVariant}
                selectVariant={this.selectVariant}
                visibleModal={this.openModal}
                ViewModal={this.setUpModal}
                openLink={this.redirectToUrl}
                UrlTitle={this.state.productDel.link_title}
                UrlDescription={this.state.productDel.link_description}
                leftModels={this.state.leftModels}
                leftDays={this.state.leftDays}
                leftViews={this.state.leftViews}
                updateMobilePayload={this.updateMobilePayload}
                language={this.state.language}
              />
            )}
            <div id="myModal" className="modal"></div>
            <div className="modal-content">
              <div className="contentArea">
                <h1>
                  {" "}
                  {this.state.language === "French"
                    ? "Voir le rover en rÃ©alitÃ© augmentÃ©e"
                    : "How to View in Augmented Reality"}
                </h1>
                <p>
                  {this.state.language === "French"
                    ? `Balayez ce code QR avec votre tÃ©lÃ©phone pour voir le rover devant vous. 
                  Lâ€™expÃ©rience se lancera automatiquement, aucune application Ã  tÃ©lÃ©charger!`
                    : `Scan this QR code with your phone to view the object in your
              space. The experience launches directly from your browser - no app
              required !`}
                </p>
                <p>
                  {this.state.language === "French"
                    ? `*Pour de meilleurs rÃ©sultats, utilisez un iPhone 12 ou plus rÃ©cent.`
                    : `*works best with iPhone 12 & above`}{" "}
                </p>
              </div>
              <div id="qrCodeWrapper">
                {this.state.productStatus === "draft" ? (
                  <QRCode
                    value={
                      "https://portal.actuality.live/modelDynamicviewer/" +
                      this.props.matchparams.id
                    }
                    style={{ height: 200, width: 200, marginTop: 12 }}
                  />
                ) : (
                  <QRCode
                    value={
                      "https://actuality.live/modelDynamicviewer/" +
                      this.props.matchparams.id
                    }
                    style={{ height: 200, width: 200, marginTop: 12 }}
                  />
                )}
              </div>
              <span className="closeBtn">
                {this.state.language === "French" ? "Proche" : "Close"}
              </span>
            </div>
            {/* <CookieConsent
              // location="bottom"
              buttonText="Accept"
              declineButtonClasses="Decline"
              onAccept={()=>this.cookies}
              cookieName="fx_co."
              cookieValue={this.state.ip}
              enableDeclineButton={true}
              style={{ background: "#2B373B" }}
              buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
              expires={150}
            >
              This website uses cookies to enhance the user experience.{" "}
            </CookieConsent> */}
            <Modal
              visible={this.state.visible}
              width="550"
              height="450"
              effect="fadeInUp"
              onClickAway={() => this.closeModal()}
            >
              <div className="shareModal web">
                <span
                  className="textMain"
                  style={{
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Share
                </span>
                <img
                  src={remove}
                  width="15px"
                  height="15px"
                  alt=""
                  className="colseModelbtn"
                  onClick={() => this.closeModal()}
                />
                {/* <span
                  className="textMain"
                  style={{ marginLeft: "84px", fontWeight: 400 }}
                >
                  For internal testing only
                </span> */}
                <Grid container spacing={2} style={{ position: "relative" }}>
                  <Grid item sm={3}>
                    {" "}
                    <Typography>URL</Typography>{" "}
                  </Grid>
                  <Grid item sm={7}>
                    <input
                      className="input"
                      value={this.state.value}
                      onChange={({ target: { value } }) =>
                        this.setState({ value, copied: false })
                      }
                      style={{
                        width: window.innerWidth < 1100 ? "81%" : "",
                        marginLeft: window.innerWidth < 1100 ? "10px" : "",
                      }}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    {this.state.productStatus === "draft" ? (
                      <CopyToClipboard
                        text={this.state.value}
                        onCopy={this.copyUrl}
                      >
                        <Button
                          className="CopyBtn"
                          style={{
                            marginLeft: window.innerWidth < 1100 ? "-45px" : "",
                          }}
                        >
                          Copy
                        </Button>
                      </CopyToClipboard>
                    ) : (
                      <CopyToClipboard
                        text={this.state.value}
                        onCopy={this.copyUrl}
                      >
                        <Button
                          className="CopyBtn"
                          style={{
                            marginLeft: window.innerWidth < 1100 ? "-45px" : "",
                          }}
                        >
                          Copy
                        </Button>
                      </CopyToClipboard>
                    )}
                    {this.state.copied ? (
                      <Typography
                        style={{
                          color: "red",
                          marginTop: window.innerWidth < 1100 ? "" : "40px",
                          marginLeft: window.innerWidth < 1100 ? "" : "22px",
                        }}
                      >
                        Copied.
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ position: "relative" }}>
                  <Grid item sm={3}>
                    {window.innerWidth < 1100 ? (
                      <Typography>Code</Typography>
                    ) : (
                      <Typography>Embed Code</Typography>
                    )}
                  </Grid>
                  <Grid item sm={7}>
                    <input
                      type="text"
                      className="input"
                      value={this.state.embedCode}
                      style={{ width: window.innerWidth < 1100 ? "84%" : "" }}
                      onChange={({ target: { embedCode } }) =>
                        this.setState({ embedCopy: false })
                      }
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <CopyToClipboard
                      text={this.state.embedCode}
                      onCopy={this.copyEmbed}
                    >
                      <Button
                        className="CopyBtn"
                        style={{
                          marginLeft: window.innerWidth < 1100 ? "-45px" : "",
                        }}
                      >
                        Copy
                      </Button>
                    </CopyToClipboard>
                    {this.state.embedCopy ? (
                      <Typography
                        style={{
                          color: "red",
                          marginTop: window.innerWidth < 1100 ? "" : "40px",
                          marginLeft: window.innerWidth < 1100 ? "" : "22px",
                        }}
                      >
                        Copied.
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
                {/* shareurl */}
                <Grid container spacing={2} style={{ position: "relative" }}>
                  <Grid item sm={3}>
                    {window.innerWidth < 1100 ? (
                      <Typography>View 3D</Typography>
                    ) : (
                      <Typography>View 3D </Typography>
                    )}
                  </Grid>
                  <Grid item sm={7}>
                    <input
                      type="text"
                      className="input"
                      value={this.state.shareUrl}
                      style={{ width: window.innerWidth < 1100 ? "84%" : "" }}
                      onChange={({ target: { shareUrl } }) =>
                        this.setState({ copyShareUrl: false })
                      }
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <CopyToClipboard
                      text={this.state.shareUrl}
                      onCopy={this.copyShare}
                    >
                      <Button
                        className="CopyBtn"
                        style={{
                          marginLeft: window.innerWidth < 1100 ? "-45px" : "",
                        }}
                      >
                        Copy
                      </Button>
                    </CopyToClipboard>
                    {this.state.copyShareUrl ? (
                      <Typography
                        style={{
                          color: "red",
                          marginTop: window.innerWidth < 1100 ? "" : "40px",
                          marginLeft: window.innerWidth < 1100 ? "" : "22px",
                        }}
                      >
                        Copied.
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ position: "relative" }}>
                  <Grid item sm={3}>
                    {" "}
                    <Typography>QR code</Typography>{" "}
                  </Grid>
                  <Grid item sm={4}>
                    {this.state.productStatus === "draft" ? (
                      <QRCode
                        id="QRCode"
                        value={
                          "https://portal.actuality.live/modelDynamicviewer/" +
                          this.state.productId
                        }
                        style={{ height: 150, width: 150, marginTop: 12 }}
                      />
                    ) : (
                      <QRCode
                        id="QRCode"
                        value={
                          "https://actuality.live/modelDynamicviewer/" +
                          this.state.productId
                        }
                        style={{ height: 150, width: 150, marginTop: 12 }}
                      />
                    )}
                  </Grid>
                  <Grid item sm={5}>
                    <Button
                      className="CopyBtn"
                      onClick={this.downloadQR}
                      style={{
                        marginTop: window.innerWidth < 1100 ? "122px" : "120px",
                        marginLeft: window.innerWidth < 1100 ? "78px" : "",
                        position:
                          window.innerWidth < 1100 ? "absolute" : "relative",
                      }}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Modal>
          </div>
          //{" "}
        </Beforeunload>
      );
    }
  }
}

const ModelDescription = ({ title, sub_title }) => (
  <div className="cardFirstPreview">
    <Typography
      className="modelTitlePreview"
      style={{ fontWeight: 500 }}
      variant="h5"
    >
      {title ?? ` `}
      {/* {this.state.productDel.title ? this.state.productDel.title : ""} */}
    </Typography>
    {/* <p className="subtitlePreview">Scroll to zoom</p> */}
    <p className="subtitlePreview" style={{ border: "0px solid red" }}>
      {/* {this.state.productDel
          ? this.state.productDel.sub_title === "undefined"
            ? null
            : this.state.productDel.sub_title
          : ""} */}
      {sub_title ?? ` `}
    </p>
  </div>
);
