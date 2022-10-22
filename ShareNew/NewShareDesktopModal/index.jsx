import { useRef, useEffect, useLayoutEffect } from "react";
import "./index.scss";

import { API } from "../../../Constants/APIs";
import Header from "./Header";
import { useMediaHook } from "./useMediaHook";

import Components from "./Components";
import RightBox from "./RightBox";
import ActualityLogo from "./ActualityLogo";
import ArBtn from "./ArBtn";
import BottomIcons from "./BottomIcons";
import MobileBottom from "./MobileBottom";
import InstructionModal from "./InstructionModal";
import ModelPopUp from "./ModelPopUp";

import { iframeLoadedListener, isRenderInIframe, sendOriginBack } from "./lib";
import { addViewpostMetaTag } from "../../../Helpers/addViewport";
import MobileNotSupportAr from "./MobileNotSupportAr";

const NewShareDesktopModal = ({
  propState,
  setState,
  redirectToUrl,
  checkSelected,
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

  const arModalRef = useRef();
  const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const canActivateAr = () => modelRef.current.canActivateAR;

  const activateAR = (rightAway = false) => {
    if (rightAway) {
      modelRef.current.activateAR();
      return;
    }
    if (!isMobile()) {
      arModalRef.current.openARPopUp();
      return;
    }

    if (true && !modelRef?.current?.canActivateAR && isMobile()) {
      arNotSupportedRef.current.close();
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
      <div className="SDM">
        {!isMobile() && (
          <ModelPopUp
            matchparams={matchparams}
            propState={propState}
            ref={arModalRef}
          />
        )}
        <div className="wrapper">
          <div
            className="modelContainer"
            style={{
              border: "0px solid green",
              width: isMdOrDown ? "95vw" : "80vw",
              height: isMdOrDown ? "100vh" : "85vh",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
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
                scale="1"
                shadow-intensity={"2"}
                quick-look-browsers="safari chrome"
                min-field-of-view={window.innerWidth < 600 ? "90deg" : "55deg"}
                max-field-of-view={window.innerWidth < 600 ? "90deg" : "55deg"}
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
                camera-orbit={
                  isMdOrDown ? `0deg 75deg 105%` : "0deg 75deg 105%"
                }
                style={{
                  background: "#FFFFFF",
                }}
                // field-of-view={isMdOrDown ? "18deg" : "20deg"}
              ></model-viewer>
            </div>
            {/* 
              camera-target={
                  isMdOrDown ? "0m -0.002m -0.02m" : "auto auto auto"
                }   */}
            <Header
              propState={propState}
              redirectToUrl={redirectToUrl}
              setState={setState}
            />
            {!isMdOrDown && (
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
            )}
            {isMdOrDown && (
              <MobileBottom
                activateAR={activateAR}
                hideMaterials={hideMaterials}
                propState={propState}
                selectMaterial={selectMaterial}
                checkSelected={checkSelected}
              />
            )}
            <InstructionModal
              canActivateAr={canActivateAr}
              propState={propState}
              matchparams={matchparams}
              activateAR={activateAR}
            />
          </div>
        </div>
      </div>
      {isMdOrDown && <MobileNotSupportAr ref={arNotSupportedRef} />}
    </>
  );
};

export default NewShareDesktopModal;
