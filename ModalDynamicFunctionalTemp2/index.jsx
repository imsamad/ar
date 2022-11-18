/**
 *
 * @URL - http://localhost:3000/modelDynamicviewer/62b048d0d9c1e7445d9b04a0
 */

import React, { useState } from "react";
import ModalDynamic from "./ModalDynamic";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../Constants/APIs";
import PasscodeVerfiy from "../PasscodeVerify";
import { useMediaHook } from "../useMediaHook";

export default function ModalDynamicFunctionalTemp() {
  let id = useParams();
  const [isProtected, setisProtected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProduct = () => {
      axios
        .get(API.getUrls.getSingleProduct + id.id)
        .then(({ data }) => {
          console.log("singleProduct ", data);
          setisProtected(!!data.product.is_protected);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("err ", err);
          setIsLoading(false);
        });
    };
    getProduct();
  }, []);

  const [isVerify, setIsVerify] = useState(false);
  const isMdOrDown = useMediaHook();
  return (
    <div>
      {isLoading ? (
        <></>
      ) : isProtected && !isVerify ? (
        <PasscodeVerfiy
          productId={id.id}
          onSubmit={() => {
            setIsVerify(true);
          }}
        />
      ) : (
        <ModalDynamic matchparams={id} isMdOrDown={isMdOrDown} />
      )}
    </div>
  );
}
