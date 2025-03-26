import React from "react";
import styled from "styled-components";
import closeIcon from "../../assets/icon/ic_delete.png";
import BtnDelete from "../BtnDelete";

// props: onConfirm, onCancel, size ("big" | "small")
export default function PopupTwoButton({ onConfirm, onCancel, size = "big" }) {
  return (
    <Wrapper $size={size}>
      <CloseButton onClick={onCancel}>
        <img src={closeIcon} alt="닫기" />
      </CloseButton>

      <Message>팝업 내용이 들어갑니다</Message>

      <ButtonGroup>
        <BtnDelete onClick={onConfirm} size={size} type="confirm" />
      </ButtonGroup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => (props.$size === "small" ? "343px" : "496px")};
  padding: ${(props) => (props.$size === "small" ? "20px 16px" : "24px")};
  background-color: #212121;
  border-radius: 16px;
  color: #fff;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Message = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;

const CancelButton = styled.button`
  width: ${(props) => (props.$size === "small" ? "135px" : "194px")};
  height: ${(props) => (props.$size === "small" ? "44px" : "48px")};
  border-radius: 50px;
  background: none;
  border: 1.5px solid #eb5230;
  color: #eb5230;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
