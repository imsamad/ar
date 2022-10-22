import React from "react";
import { useParams } from "react-router-dom";
import ShareModal from "./ShareModal";

export default function ShareNew() {
  let id = useParams();
  // console.log(id);
  return (
    <div>
      {/* <ModalDynamic matchparams={id} FROM_SHARE_PAGE={true} /> */}
      <ShareModal matchparams={id} />
    </div>
  );
}
