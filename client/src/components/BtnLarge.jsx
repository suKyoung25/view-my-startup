import React from "react";
import styled from "styled-components";
import { brand_orange } from "../styles/colors";
import { black_100 } from "../styles/colors";
import { gray_200 } from "../styles/colors";

{
  /* 아래 props는 type=black/orange/""  size=big/small*/
}

function BtnLarge({ type, size, label, onClick, disabled, icon }) {
  return (
    <Container $type={type} $size={size} onClick={onClick} disabled={disabled}>
      {icon && <img src={icon} alt="icon" />}
      <Text $size={size}>{label}</Text>
    </Container>
  );
}

const Container = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-radius: 50px;
  border-color: ${brand_orange};
  border-width: ${(props) => {
    if (props.$type === "") return "1px";
    return "0px";
  }};

  background-color: ${(props) => {
    if (props.$type === "black") return black_100;
    if (props.$type === "orange") return brand_orange;
    return "none";
  }};

  color: ${(props) => {
    if (props.$type === "black") return gray_200;
    if (props.$type === "orange") return "#FFFFFF";
    return brand_orange;
  }};

  width: ${(props) => {
    if (props.$type === "" && props.$size === "big") return "194px";
    if (props.$type === "" && props.$size === "small") return "135px";
    return props.$size === "small" ? "135px" : "183px";
  }};
  height: ${(props) => {
    return props.$size === "small" ? "40px" : "48px";
  }};
`;

const Text = styled.div`
  padding: ${(props) => {
    if (props.$size === "big") return "13px, 48px, 13px, 48px";
    if (props.$size === "small") return "13px, 24px, 13px, 24px";
  }};
  font-size: ${(props) => {
    if (props.$size === "big") return "16px";
    if (props.$size === "medium") return "16px";
    if (props.$size === "small") return "14px";
    if (props.$type === "") return "18px";
  }};
`;

export default BtnLarge;
