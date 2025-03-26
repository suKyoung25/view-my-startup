import React from "react";
import styled from "styled-components";
import Search from "../Search";
import closeIcon from "../../assets/icon/ic_delete.png";
import { black_300 } from "../../styles/colors";
import { black_400 } from "../../styles/colors";

// 아래 props는 size=big/small
function SelectMyEnterprise({ isOpen, onClose, size }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container $size={size} onClick={(e) => e.stopPropagation()}>
        <Title>
          <div>나의 기업 선택하기</div>
          <img onClick={onClose} src={closeIcon} alt="닫기" />
        </Title>
        <Search $size={size} />
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${black_400}80;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  background-color: ${black_300};
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
