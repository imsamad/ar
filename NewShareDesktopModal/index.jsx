import { useRef, useEffect, useLayoutEffect, forwardRef } from "react";
import "./index.scss";

import { API } from "../../Constants/APIs";
import Header from "./Header";
import { useMediaHook } from "./useMediaHook";

import Components from "./Components";
import RightBox from "./RightBox";
import ActualityLogo from "./ActualityLogo";
import ArBtn from "./ArBtn";
import BottomIcons from "./BottomIcons";
import MobileBottom from "./MobileBottom";
import InstructionModal from "./InstructionModal2";
import ModelPopUp from "./ModelPopUp";

import closeModal from "../../Assets/newIcons/closeModal.png";
import { iframeLoadedListener, isRenderInIframe } from "./lib";
import { addViewpostMetaTag } from "../../Helpers/addViewport";

const ShareDesktopModal = ({
  propState,
  model,
  defaultOptions,
  toggleMenu,
  setState,
  redirectToUrl,
  updateMobilePayload,
  checkSelected,
  hideBuyNow,
  selectMaterial,
  hideMaterials,
  matchparams,
}) => {
  useEffect(() => {
    addViewpostMetaTag();
  });
  const isMdOrDown = useMediaHook();

  const modelRef = useRef();
  const arNotSupportedRef = useRef();

  const closeArSupport = () =>
    arNotSupportedRef.current.classList.toggle("show");

  const arModalRef = useRef();
  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const activateAR = () => {
    if (!isMobile()) arModalRef.current.openARPopUp();

    if (!modelRef?.current?.canActivateAR && isMobile()) {
      arNotSupportedRef.current.classList.toggle("show");
      return;
    }

    modelRef.current.canActivateAR && modelRef.current.activateAR();
  };

  useEffect(() => {
    iframeLoadedListener();
  }, []);

  useLayoutEffect(() => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width < 800) {
      modelRef.current.setAttribute("camera-target", "0m 0.2m 0m");
    }
    if (isRenderInIframe()) {
      modelRef.current.setAttribute("camera-target", "0m 0 0m");
    }
  }, []);

  return (
    <>
      {!isMobile() && (
        <ModelPopUp
          matchparams={matchparams}
          propState={propState}
          ref={arModalRef}
        />
      )}
      <div
        // just for unique reference
        className="SDM"
        style={{
          border: "0px solid aqua",
        }}
      >
        <div
          className="wrapper"
          style={{
            border: "0px solid green",
            padding: 0,
            maxHeight: window.innerHeight,
          }}
        >
          <div
            className="modelContainer"
            style={{
              border: "0px solid blue",
              width: isMdOrDown ? "100vw" : "80vw",
              height: isMdOrDown ? window.innerHeight : "85vh",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isMdOrDown ? (
              <>
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    border: "0px solid red",
                  }}
                >
                  <Header
                    propState={propState}
                    redirectToUrl={redirectToUrl}
                    setState={setState}
                  />
                  <ArBtn activateAR={activateAR} />
                  <MV propState={propState} ref={modelRef} />
                </div>

                <MobileBottom
                  activateAR={activateAR}
                  hideMaterials={hideMaterials}
                  propState={propState}
                  selectMaterial={selectMaterial}
                  checkSelected={checkSelected}
                />
              </>
            ) : (
              <>
                <MV propState={propState} ref={modelRef} />
                <Header
                  propState={propState}
                  redirectToUrl={redirectToUrl}
                  setState={setState}
                />
                <Components
                  hideMaterials={hideMaterials}
                  propState={propState}
                  selectMaterial={selectMaterial}
                  checkSelected={checkSelected}
                />
                <RightBox
                  propState={propState}
                  redirectToUrl={redirectToUrl}
                  setState={setState}
                />
                <ActualityLogo propState={propState} />
                <ArBtn activateAR={activateAR} />
                <BottomIcons />
              </>
            )}

            {/* {!isMdOrDown && (
              <>
                <Components
                  hideMaterials={hideMaterials}
                  propState={propState}
                  selectMaterial={selectMaterial}
                  checkSelected={checkSelected}
                />
                <RightBox
                  propState={propState}
                  redirectToUrl={redirectToUrl}
                  setState={setState}
                />
                <ActualityLogo propState={propState} />
                <ArBtn activateAR={activateAR} />
                <BottomIcons />
              </>
            )} */}
            {/* {isMdOrDown && (
              <MobileBottom
                activateAR={activateAR}
                hideMaterials={hideMaterials}
                propState={propState}
                selectMaterial={selectMaterial}
                checkSelected={checkSelected}
              />
            )} */}
            <InstructionModal propState={propState} matchparams={matchparams} />
          </div>
        </div>
      </div>
      <ModelPopUp propState={propState} matchparams={matchparams} />
      <div className="arNotSupportedRef" ref={arNotSupportedRef}>
        <div
          className="arNotSupportedRefContent"
          style={{
            borderTop: "1px solid #ddd",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter",

                  fontSize: 16,
                  fontWeight: 500,
                  paddingRight: "2rem",
                  flexGrow: 1,
                  textAlign: "center",
                }}
              >
                Hey! It looks like your device doesn't support AR. Please
                <a
                  href="https://arcade.ltd/is-my-device-ar-compatible/"
                  target={"_blank"}
                  style={{ color: "#000" }}
                >
                  CLICK HERE
                </a>
                to check the supported device list.
              </div>
              <img
                onClick={closeArSupport}
                src={closeModal}
                width={24}
                height={24}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareDesktopModal;

const MV = forwardRef(({ propState }, modelRef) => {
  const isMdOrDown = useMediaHook();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        border: "0px solid red",
      }}
    >
      <model-viewer
        ref={(elem) => {
          modelRef.current = elem;
        }}
        id="mediaViewer model-viewer"
        src={
          propState.showVariant
            ? API.imgUrl + propState.selectedVariant.model_file_url
            : API.imgUrl + propState.ModalImage
        }
        ios-src={API.imgUrl + propState.selectedVariant.usdz_file_url}
        exposure={"0.8"}
        // scale="1"
        shadow-intensity={"1"}
        shadow-softness={"1"}
        quick-look-browsers="safari chrome"
        // min-field-of-view={window.innerWidth < 600 ? "90deg" : "55deg"}
        // max-field-of-view={window.innerWidth < 600 ? "90deg" : "55deg"}
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
        touch-action="none"
        // camera-orbit={isMdOrDown ? `0deg 75deg 105%` : "0deg 75deg 105%"}
        style={{
          background: "#FFFFFF",
        }}
        // field-of-view={isMdOrDown ? "18deg" : "20deg"}
      ></model-viewer>
    </div>
  );
});
