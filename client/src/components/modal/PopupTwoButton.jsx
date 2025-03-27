import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../../assets/icon/ic_delete.png";
import BtnDelete from "../BtnDelete";
import BtnLarge from "../BtnLarge";

export default function PopupTwoButton({ onConfirm, onCancel, size = "big" }) {
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

  const currentSize = isMobile ? "small" : size;

  return (
    <Overlay onClick={onCancel}>
      <Wrapper $size={currentSize} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onCancel}>
          <img src={closeIcon} alt="닫기" />
        </CloseButton>

        <Message>팝업 내용이 들어갑니다</Message>

        <ButtonGroup>
          <BtnLarge
            type=""
            size={currentSize}
            label="취소"
            onClick={onCancel}
          />
          <BtnDelete onClick={onConfirm} size={currentSize} type="confirm" />
        </ButtonGroup>
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
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
  padding: ${(props) => (props.$size === "small" ? "20px 16px" : "24px")};
  background-color: #212121;
  border-radius: 16px;
  color: #fff;
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
