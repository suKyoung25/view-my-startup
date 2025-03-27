import React from "react";
import styled from "styled-components";
import { brand_orange } from "../styles/colors";
import { black_100 } from "../styles/colors";
import { gray_200 } from "../styles/colors";

{
  /* 아래 props는 type=black/orange/""  size=big/small*/
}

function BtnLarge({ type, size, label, onClick }) {
  return (
    <Container $type={type} $size={size} onClick={onClick}>
      <Text $size={size}>{label}</Text>
    </Container>
  );
}

const Container = styled.div`
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
    if (props.$size === "big") return "183px";
    if (props.$size === "medium") return "183px";
    if (props.$size === "small") return "135px";
  }};
  height: ${(props) => {
    if (props.$size === "big") return "48px";
    if (props.$size === "medium") return "48px";
    if (props.$size === "small") return "40px";
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
  }};
`;

export default BtnLarge;
