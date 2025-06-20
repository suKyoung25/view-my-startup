import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/icon/ic_delete.png";
import BtnDelete from "../BtnDelete";
import { black_400 } from "../../styles/colors";

export default function PopupOneButton({
  onConfirm,
  onCancel,
  size = "big",
  type,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    document.body.style.overflow = "hidden"; // 스크롤 막기
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, []);

  const getMessage = () => {
    switch (type) {
      case "error":
        return "잘못된 비밀번호로 삭제에 실패하셨습니다.";
      case "delete-cuccess":
        return "삭제가 완료되었어요!";
      case "success":
        return "투자가 완료되었어요!";
      default:
        return "팝업 내용이 들어갑니다";
    }
  };

  return (
    <Overlay onClick={onCancel}>
      <Wrapper
        $size={isMobile ? "small" : size}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <CloseButton onClick={onCancel}>
          <img src={closeIcon} alt="닫기" />
        </CloseButton>

        <ContentBox $size={isMobile ? "small" : size}>
          <Message $size={isMobile ? "small" : size}>{getMessage()}</Message>

          <ButtonGroup>
            <BtnDelete
              onClick={onConfirm}
              size={isMobile ? "small" : size}
              type="confirm"
            />
          </ButtonGroup>
        </ContentBox>
      </Wrapper>
    </Overlay>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${black_400}80;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$size === "small" ? "343px" : "496px")};
  height: ${(props) => (props.$size === "small" ? "161px" : "186px")};
  padding: ${(props) => (props.$size === "small" ? "16px" : "24px")};
  background-color: #212121;
  border-radius: 16px;
  color: #ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
