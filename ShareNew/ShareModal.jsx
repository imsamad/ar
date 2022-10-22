import "@google/model-viewer";
import axios from "axios";
import qs from "query-string";
import React, { Component } from "react";
import "../../App.scss";
import Geocode from "react-geocode";
import { Navigate } from "react-router-dom";
import loader from "../../Assets/lottie/3dloader.json";
import { API } from "../../Constants/APIs";
import NewShareDesktopModal from "./NewShareDesktopModal";
import { addViewpostMetaTag } from "../../Helpers/addViewport";

const screen = window.innerWidth <= 1024 ? "mobile" : "desktop";

export default class ShareModal extends Component {
  constructor() {
    super();
    addViewpostMetaTag();

    // console.log("screen ", window.screen.width);
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
      modalVisible: true,
      showMaterials: true,

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
      heightModal: "150px",
      widthModal: "50%",
      showBuyNow: true,
    };
  }

  componentDidMount() {
    // console.log("gdvdfg", window.innerWidth);
    const referrer = document.referrer;
    // console.log(document.referrer);
    // const referrer ="https://admin.actuality.live/admin/analytics/624d87e3cc0658544fec4425"
    if (referrer.length > 0) {
      let domain = referrer.split("/");
      domain = domain[0] + "//" + domain[2];
      // console.log(domain);
      this.setState({ referrer: domain, modalVisible: true });
      // console.log( referrer);
    } else {
      this.setState({ referrer: "N/A" });
    }

    // window.addEventListener("beforeunload",(e)=>{
    //   e.preventDefault();
    //   alert("Are you sure to close this tab?")
    // })

    // window.onbeforeunload = function (e) {
    // this.postAnalytics();
    // return;
    // if( queue not empty ) {
    //   return;
    // }
    // var dialogText = "Dialog text here";
    // e.returnValue = dialogText;
    // return dialogText;
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
      // console.log("hi", resp);
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
              // console.log(respPlan);
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
                    // console.log(resViews);
                  });
                // }
              }
            });
          // console.log(payId);
          // axios.get(API.getUrls.getSingleProduct + payId).then((resp) => {
          // console.log(resp);
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
                  "https://beta.actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id +
                  "' title='some' scrolling='No' height='750px' width='100%' frameborder='0'></iframe>",
                value:
                  "https://beta.actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id,
                QRCode:
                  "https://beta.actuality.live/modelDynamicviewer/" +
                  this.props.matchparams.id,
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

  toggleMenu = () => {
    this.setState({
      toggle: true,
    });
  };

  hideMaterials = () => {
    this.setState({ showMaterials: !this.state.showMaterials });
  };

  hideBuyNow = () => {
    this.setState({ showBuyNow: !this.state.showBuyNow });
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
            // console.log(this.state.city, this.state.country);
          }
        );
      },
      (error) => {
        // console.error(error);
      }
    );
  };

  postAnalytics = () => {
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
        // console.log(resp);
        // alert("post");
      })
      .catch((error) => {
        if (error) {
          // console.log(error.response);
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

  setModel = () => {
    axios
      .get(API.getUrls.getProducts + "/" + this.props.matchparams.id)
      .then((res) => {
        // console.log(res);
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
        // console.log("component", res);
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
                // console.log(component.materials);
                // console.log(this.state.selectedVariant.materials[0]._id);
                const _material = component.materials.find(
                  (mat) =>
                    mat._id === this.state.selectedVariant.materials[0]._id
                );
                // console.log(_material);
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
        // console.log("variant", res);
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

  setUpModal = () => {
    return;
    console.log(`setUpModal`);
    const anyMV = document.getElementsByTagName("model-viewer")[0];
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const canActivateAR = anyMV.canActivateAR;
    // if (canActivateAR) return;

    if (isMobile) return;

    var modal = document.getElementById("myModal");

    var modalContent = document.querySelector(".modal-content");

    var btn =
      document.getElementById("qrtext") ||
      document.getElementById("SDM_QR_TEXT");
    // console.log(`btnbtnbtnbtnbtnbtnbtnbtnbtn `, btn);
    var span = document.getElementsByClassName("closeBtn")[0];

    if (btn)
      btn.onclick = function () {
        console.log("btn was clicked");
        modal.style.display = "block";
        modalContent.classList.add("slideIn");
        modalContent.style.opacity = 1;
      };

    if (span)
      span.onclick = function () {
        modalContent.classList.remove("slideIn");
        modal.style.display = "none";
        modalContent.style.opacity = 0;
        // modalContent.style.display = "none";
      };

    window.onclick = function (event) {
      if (event.target === modal) {
        modalContent.classList.remove("slideIn");
        modal.style.display = "none";
      }
    };
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
      window.open("/share/" + this.props.matchparams.id, "_blank");

      this.setState({
        copied: false,
      });
    }, 2000);
  };

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

  openModal = () => {
    // var url =document.getElementById("myFrame").getAttribute("src");
    // var newUrl = url.substring(0,url.indexOf("width")) + "width=500&height=500";
    // document.getElementById("myFrame").setAttribute("src",newUrl);
    // document.getElementById("inneriframe").css({ height: "750px;" });
    // alert("The height was changed!");
    this.setState(
      {
        modalVisible: true,
        heightModal: "100vh",
        widthModal: "100%",
      }
      // () => {
      //   this.props.sendData(this.state.heightModal, this.state.widthModal);
      // }
    );
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
        <div id="shareModalOuterMostDiv">
          <NewShareDesktopModal
            propState={this.state}
            model={model}
            defaultOptions={defaultOptions}
            toggleMenu={this.toggleMenu}
            setState={this.setState}
            redirectToUrl={this.redirectToUrl}
            updateMobilePayload={this.updateMobilePayload}
            checkSelected={this.checkSelected}
            hideBuyNow={this.hideBuyNow}
            selectMaterial={this.selectMaterial}
            hideMaterials={this.hideMaterials}
            matchparams={this.props.matchparams}
          />
        </div>
      );
    }
  }
}
