import React from "react";
import styled from "styled-components";
import bigCheck from "../assets/images/btnOutline/check.png";
import smallCheck from "../assets/images/btnOutline/smallCheck.png";
import { black_100, brand_orange, gray_100, gray_200 } from "../styles/colors";

{
  /* 아래 props는 text=choice/complete/cancel type=black/orange/none size=big/small src=exixtBig/existSmall/"" */
}

function BtnOutline({ text, type, size, src }) {
  const imageSrc =
    src === "existBig" ? bigCheck : src === "existSmall" ? smallCheck : null;

  const innerText =
    text === "choice"
      ? "선택하기"
      : text === "complete"
      ? "선택완료"
      : text === "cancel"
      ? "선택 해제"
      : null;

  return (
    <Container $type={type} $size={size}>
      <Img src={imageSrc}></Img>
      <Text $size={size}>{innerText}</Text>
    </Container>
  );
}

const Container = styled.div`
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) =>
    props.$type === "orange"
      ? brand_orange
      : props.$type === "black"
      ? black_100
      : props.$type === "white"
      ? gray_100
      : null};

  color: ${(props) => {
    if (props.$type === "black") return gray_200;
    if (props.$type === "orange") return brand_orange;
    if (props.$type === "white") return gray_100;
  }};

  width: ${(props) => {
    if (props.$size === "big") return "104px";
    if (props.$size === "small") return "73px";
  }};
  height: ${(props) => {
    if (props.$size === "big") return "48px";
    if (props.$size === "small") return "32px";
  }};
`;

const Img = styled.img`
  padding-right: 4px;
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

export default BtnOutline;
