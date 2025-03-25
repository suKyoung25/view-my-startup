import React from "react";
import styled from "styled-components";
import company from "../assets/images/company/sample.png";
import BtnOutline from "./BtnOutline";
import { gray_200, gray_100 } from "../styles/colors";

function List({
  size = "big",
  src = company,
  companyName = "코드잇",
  discription = "에듀테크",
}) {
  return (
    <Container $size={size}>
      <Img $size={size} src={src} alt="Company" />

      <Title $size={size}>{companyName}</Title>
      <Discription $size={size}>{discription}</Discription>
      <BtnOutline text={"choice"} type={"orange"} size={size} src={""} />
    </Container>
  );
}

export default List;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: ${gray_100};
  // border: 1px solid ${gray_200};
  padding: 5px;
  width: ${(props) => (props.$size === "big" ? "448px" : "311px")};
  height: ${(props) => (props.$size === "big" ? "48px" : "40px")};
`;

const Img = styled.img`
  width: ${(props) => (props.$size === "big" ? "48px" : "40px")};
  height: ${(props) => (props.$size === "big" ? "48px" : "40px")};
  border-radius: 100%;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.$size === "big" ? "16px" : "14px")};
  color: white;
  width: auto;
  padding: 0 10px;
  white-space: nowrap;
`;

const Discription = styled.p`
  width: 100%;
  font-size: ${(props) => (props.$size === "big" ? "14px" : "12px")};
  color: ${gray_200};
`;
