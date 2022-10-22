import React, { useEffect } from "react";

const index = ({ children }) => {
  useEffect(() => {
    const shareModalOuterMostDiv = document.getElementById(
      "shareModalOuterMostDiv"
    );

    // window.addEventListener("message", function (e) {
    //   console.log("e from postMessage", e);
    // });
  }, []);

  return <div>index</div>;
};

export default index;
