import React, { useState } from "react";
import styled from "styled-components";
import closeIcon from "../../assets/icon/ic_delete.png";
import { PasswordInputField } from "../Input";
import BtnDelete from "../BtnDelete";

export default function ModalPassword({ onClose, onDelete, size = "pc" }) {
  const [password, setPassword] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const handleDelete = () => {
    if (password.trim() === "") {
      setIsTouched(true);
      return;
    }
    onDelete(password);
  };

  return (
    <Wrapper $size={size}>
      <Header>
        <Title>삭제 권한 인증</Title>
        <CloseBtn onClick={onClose}>
          <img src={closeIcon} alt="닫기" />
        </CloseBtn>
      </Header>

      <Label>비밀번호</Label>

      <PasswordInputField
        size="big"
        placeholder="패스워드를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onTouched={isTouched}
      />

      {/* <BtnDelete onClick={handleDelete} size={size} /> */}
      <BtnDeleteWrapper>
        <BtnDelete onClick={handleDelete} size={size} />
      </BtnDeleteWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: ${(props) => (props.$size === "small" ? "300px" : "20px")};
  left: 50%;
  transform: translateX(-50%);
  width: ${(props) => (props.$size === "small" ? "343px" : "496px")};
  height: ${(props) => (props.$size === "small" ? "225px" : "269px")};

  background-color: #212121;
  border-radius: 16px;
  padding: ${(props) => (props.$size === "small" ? "16px" : "24px")};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  z-index: 9999;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    display: block;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  align-self: flex-start;
`;

const BtnDeleteWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
