import React from "react";
import styled from "styled-components";
import bigCheck from "../assets/check.png";
import smallCheck from "../assets/smallCheck.png";

function BtnOutline({ text, type, size, src }) {
  const imageSrc =
    src === "existBig" ? bigCheck : src === "existSmall" ? smallCheck : null;

  const innerText =
    text === "choice"
      ? "선택하기"
      : text === "complete"
      ? "선택 완료"
      : text === "cancel"
      ? "선택 취소"
      : null;

  return (
    <Container $type={type} $size={size}>
      <Img src={imageSrc}></Img>
      <Text $size={size}>{innerText}</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${(props) =>
    props.$type === "orange"
      ? "#eb5230"
      : props.$type === "black"
      ? "#2E2E2E"
      : props.$type === "white"
      ? "#D8D8D8"
      : null};

  color: ${(props) => {
    if (props.$type === "black") return "#747474";
    if (props.$type === "orange") return "#eb5230";
    if (props.$type === "white") return "#D8D8D8";
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
