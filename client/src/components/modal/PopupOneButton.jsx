import React from "react";
import styled from "styled-components";
import closeIcon from "../../assets/icon/ic_delete.png";
import BtnDelete from "../BtnDelete";

export default function PopupTwoButton({
  onConfirm,
  onCancel,
  size = "big",
  type,
}) {
  const getMessage = () => {
    switch (type) {
      case "error":
        return "잘못된 비밀번호로 삭제에 실패하셨습니다.";
      case "success":
        return "투자가 완료되었어요!";
      default:
        return "팝업 내용이 들어갑니다";
    }
  };

  return (
    <Wrapper $size={size}>
      <CloseButton onClick={onCancel}>
        <img src={closeIcon} alt="닫기" />
      </CloseButton>

      <ContentBox $size={size}>
        <Message $size={size}>{getMessage()}</Message>

        <ButtonGroup>
          <BtnDelete onClick={onConfirm} size={size} type="confirm" />
        </ButtonGroup>
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: ${(props) => (props.$size === "small" ? "343px" : "496px")};
  height: ${(props) => (props.$size === "small" ? "161px" : "186px")};
  padding: ${(props) => (props.$size === "small" ? "16px" : "24px")};
  background-color: #212121;
  border-radius: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
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

const ContentBox = styled.div`
  width: ${(props) => (props.$size === "small" ? "311px" : "448px")};
  height: ${(props) => (props.$size === "small" ? "129px" : "138px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.$size === "small" ? "16px" : "24px")};
`;

const Message = styled.div`
  text-align: center;
  font-family: "Pretendard";
  font-weight: 400;
  font-size: ${(props) => (props.$size === "small" ? "14px" : "15px")};
  line-height: 100%;
  letter-spacing: 0;
  margin-top: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`;
