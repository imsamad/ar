const IFRAME_LOADED_ORIGIN = `IFRAME_LOADED_ORIGIN`;
export const hideModalInIframe = () => {
  if (isRenderInIframe()) return;
  const shareModalOuterMostDiv = document.getElementById(
    "shareModalOuterMostDiv"
  );
  shareModalOuterMostDiv.classList.add("close");

  // console.log(
  //   `window.parent `,
  //   window.parent.document.querySelector(".__actuality_iframeModal_container")
  // );
  // localStorage.removeItem(IFRAME_LOADED_ORIGIN);
};

export const sendOriginBack = () => {
  console.log(`sendOriginBack was called`);
  if (!isRenderInIframe()) return;
  const origin = localStorage.getItem(IFRAME_LOADED_ORIGIN);
  console.log("origin of iframe in localStorage ", origin);
  if (origin) window.parent.postMessage("I m close", origin);
  console.log(`origin was sent back`);
};

export const iframeLoadedListener = () => {
  if (!isRenderInIframe()) return;

  console.log("set pre-emptively");
  window.localStorage.setItem(
    IFRAME_LOADED_ORIGIN,
    window.self.location.ancestorOrigins[0]
  );

  console.log("set pre-emptively end");
};

export const isRenderInIframe = () => window.self != window.top;
