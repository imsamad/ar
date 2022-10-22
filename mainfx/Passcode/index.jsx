import { Checkbox, IconButton, Typography } from "@material-ui/core";
import React from "react";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { useState } from "react";

const Passcode = ({
  passcode,
  setPasscode,
  className,
  isProtected,
  toggleIsProtected,
}) => {
  return (
    <>
      <div
        style={{
          border: "0px solid red",
          // padding: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          checked={!!isProtected}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          onClick={() => {
            toggleIsProtected();
          }}
        />
        <div
          className="inlineWrapper"
          style={{
            border: "0px solid aqua",
            // padding: 0,
            // margin: 0,
          }}
        >
          <Typography
            className="buyNow"
            style={{
              padding: 0,
              margin: 0,
              fontWeight: 450,
              fontSize: "0.9rem",
            }}
          >
            I want to secure this product with passcode
          </Typography>
        </div>
      </div>
      {isProtected && (
        <>
          <div
            className="inlineWrapper"
            style={{
              border: "0px solid aqua",
              // padding: 0,
              // margin: 0,
            }}
          >
            <Typography className="buyNow" style={{ padding: 0, margin: 0 }}>
              Enter your passcode
            </Typography>
          </div>
          <PasscodeField
            className={className}
            onChange={(e) => setPasscode(e.target.value)}
            value={passcode}
          />
        </>
      )}
    </>
  );
};

export default Passcode;
export const PasscodeField = ({ onChange, className, value, style = {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        border: "0px solid blue",
        margin: "1rem 0",
      }}
    >
      <input
        className={className ? className : "Input"}
        name="title"
        type={showPassword ? "text" : "password"}
        required
        value={value}
        onChange={onChange}
        style={{
          marginBottom: "1rem",
          margin: 0,
          ...styleInput,
          ...style,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
        }}
      >
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            setShowPassword((p) => !p);
          }}
        >
          {showPassword ? (
            <VisibilityOffIcon fontSize="inherit" />
          ) : (
            <VisibilityIcon fontSize="inherit" />
          )}
        </IconButton>
      </div>
    </div>
  );
};
const styleInput = {
  width: `96%`,
  height: "37px",
  border: `1px solid #ddd`,
  background: `#ffffff`,
  borderRadius: "5px",
  outline: "none",
  paddingLeft: "10px",
};
