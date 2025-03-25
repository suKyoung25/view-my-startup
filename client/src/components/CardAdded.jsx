import React from "react";
import styled from "styled-components";
import company from "../assets/images/company/sample.png";
import deleteBtn from "../assets/images/deleteBtn.png";
import { black_300, gray_400, gray_200, gray_100 } from "../styles/colors";

function List({
  size = "big",
  src = company,
  companyName = "코드잇",
  discription = "에듀테크",
}) {
  return (
    <Container $size={size}>
      <DeleteButton src={deleteBtn} alt="삭제 버튼" />
      <Img $size={size} src={src} alt="Company" />
      <Title $size={size}>{companyName}</Title>
      <Discription $size={size}>{discription}</Discription>
    </Container>
  );
}

export default List;

const Container = styled.div`
  position: relative; /* 삭제 버튼을 절대 위치로 배치할 수 있도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${gray_400};
  color: ${gray_100};
  border-radius: 10px;
  box-sizing: border-box;
  width: ${(props) => (props.$size === "big" ? "126px" : "104px")};
  height: ${(props) => (props.$size === "big" ? "187px" : "163px")};
`;

const DeleteButton = styled.img`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Img = styled.img`
  width: ${(props) => (props.$size === "big" ? "80px" : "64px")};
  height: ${(props) => (props.$size === "big" ? "80px" : "64px")};
  border-radius: 100%;
`;

const Title = styled.h1`
  font-size: ${(props) => (props.$size === "big" ? "16px" : "14px")};
  color: white;
  width: auto;
  white-space: nowrap;
  margin: 5px;
`;

const Discription = styled.p`
  font-size: ${(props) => (props.$size === "big" ? "14px" : "12px")};
  color: ${gray_200};
  margin: 0;
`;
