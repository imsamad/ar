import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { PasscodeField } from "../Passcode";
import ProductEditTemp from "../ProductEditTemp";
import ProductEdit from "../../Screens/ProductEdit";

const PasscodeVerfiy = ({ onSubmit }) => {
  const [code, setCode] = useState("");
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
      }}
    >
      <Dialog
        open={true}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ textAlign: "center", fontSize: "25rem" }}>
          Enter your Passcode
        </DialogTitle>
        <DialogContent>
          <PasscodeField
            onChange={(e) => setCode(e.target.value)}
            value={code}
            style={{
              width: "300px",
              boxShadow: "inset 2px 1px 4px rgba(0, 0, 0, 0.25)",
            }}
          />
          <button
            onClick={() => onSubmit()}
            className="btnCommonStyles"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              width: "max-content",
              padding: "0.8rem 3rem",
              lineHeight: 1,
              borderRadius: "0.6rem",
              margin: "auto",
              marginTop: "0.7rem",
              marginBottom: "1rem",
            }}
          >
            Submit
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PasscodeVerfiy;

export const ProductEditWithVerify = ({ isEdit, isViewer }) => {
  const [isVerify, setIsVerify] = useState();
  return isVerify ? (
    !isViewer && isEdit ? (
      <ProductEdit />
    ) : (
      <ProductEditTemp />
    )
  ) : (
    <PasscodeVerfiy
      onSubmit={() => {
        setIsVerify(true);
      }}
    />
  );
};
