import React from "react";
import styled from "styled-components";
import Search from "../Search";

// 아래 props는 size=big/small
function SelectMyEnterprise({ isOpen, onClose, size }) {
  if (!isOpen) return null;

  return (
    <Container $size={size} onClick={onClose}>
      <Title onClick={(e) => e.stopPropagation()}>
        <div>나의 기업 선택하기</div>
        <div>X</div>
      </Title>
      <Search $size={size} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  background-color: #212121;
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  font-size: 20px;
  width: ${(props) => {
    if (props.$size === "big") return "496px";
    if (props.$size === "short") return "343px";
  }};
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export default SelectMyEnterprise;

// const SearchInput = styled.input`
//   background-color: #212121;
//   font-size: 14px;
//   color: #d8d8d8;
//   border-style: solid;
//   border-radius: 10px;
//   border-width: 1px;
//   border-color: #747474;
//   width: ${(props) => {
//     if (props.$size === "big") return "448px";
//     if (props.$size === "small") return "311px";
//   }};
//   height: 48px;
//   margin-top: 24px;
//   margin-bottom: 14px;
//   padding-left: 44px;
//   ::placeholder {
//     color: #d8d8d8;
//   }
// `;

// const SearchImg = styled.img`
//   position: absolute;
//   left: 35px;
//   top: 87px;
// `;
