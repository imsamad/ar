import React, { forwardRef, useRef } from "react";
import { sendOriginBack } from "./lib";

import closeModal from "../../../Assets/newIcons/closeModal.png";
import { useImperativeHandle } from "react";
const MobileNotSupportAr = forwardRef(({}, ref) => {
  const arNotSupportedRef = useRef();
  const closeArSupport = () => {
    // sendOriginBack();
    arNotSupportedRef.current.classList.toggle("show");
  };

  const open = () => {
    arNotSupportedRef.current.classList.toggle("show");
  };

  useImperativeHandle(ref, () => ({
    open: open,
    close: closeArSupport,
  }));

  return (
    <div className="arNotSupportedRef" ref={arNotSupportedRef}>
      <div
        className="arNotSupportedRefContent"
        style={{
          maxWidth: 400,
          borderTop: "1px solid #ddd",
          background: "#fff",
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
              Hey! It looks like your device doesn't support AR. Please{" "}
              <a
                href="https://arcade.ltd/is-my-device-ar-compatible/"
                target={"_blank"}
                style={{ color: "#000" }}
              >
                CLICK HERE
              </a>{" "}
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
  );
});

export default MobileNotSupportAr;
