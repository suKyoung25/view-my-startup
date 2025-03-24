import React from "react";
import styled from "styled-components";
import whiteLoadingImg from "../assets/whiteLoading.png";
import grayLoadingImg from "../assets/grayLoading.png";

function BtnMedium({ type, size, src }) {
  const imageSrc =
    src === "white" ? whiteLoadingImg : src === "gray" ? grayLoadingImg : null;
  return (
    <Container $type={type} $size={size}>
      <Img src={imageSrc}></Img>
      <Text $size={size}>기업 비교하기</Text>
    </Container>
  );
}

const Img = styled.img`
  padding-right: 4px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-radius: 50px;
  border-color: #eb5230;
  border-width: ${(props) => {
    if (props.$type === "") return "1px";
    return "0px";
  }};

  background-color: ${(props) => {
    if (props.$type === "black") return "#2E2E2E";
    if (props.$type === "orange") return "#EB5230";
    return "none";
  }};

  color: ${(props) => {
    if (props.$type === "black") return "#747474";
    if (props.$type === "orange") return "#FFFFFF";
    return "#EB5230";
  }};

  width: ${(props) => {
    if (props.$size === "big") return "183px";
    if (props.$size === "small") return "135px";
  }};
  height: ${(props) => {
    if (props.$size === "big") return "48px";
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
    if (props.$size === "small") return "14px";
  }};
`;

export default BtnMedium;
