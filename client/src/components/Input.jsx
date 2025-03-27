import React, { useState } from "react";
import styled from "styled-components";
import eyeVisibleImg from "../assets/images/passwordEye/eye-visible.svg";
import eyeInvisibleImg from "../assets/images/passwordEye/eye-invisible.svg";
import { brand_orange, gray_200 } from "../styles/colors";

// 유저 이름 입력칸
export function TextInputField({ size, placeholder, value, onChange }) {
  // const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const showError = isTouched && value === "";

  return (
    <Container $size={size} $error={showError}>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsTouched(true)}
      />
      {showError && <ErrorMessage>*필수 입력사항입니다.</ErrorMessage>}
    </Container>
  );
}

// 비밀번호 입력칸
export function PasswordInputField({ size, placeholder, value, onChange }) {
  // const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showError = isTouched && value === "";

  return (
    <Container $size={size} $error={showError}>
      <StyledInput
        type={isPasswordVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsTouched(true)}
      />
      <Icon
        src={isPasswordVisible ? eyeVisibleImg : eyeInvisibleImg}
        alt="Toggle Password Visibility"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      />
      {/* {showError && <ErrorMessage>*필수 입력사항입니다.</ErrorMessage>} */}

      {/*
  항상 렌더링하지만, 조건에 따라 투명하게 처리로 변경
*/}
      <ErrorMessage $visible={showError}>*필수 입력사항입니다.</ErrorMessage>
    </Container>
  );
}

// 공통 스타일
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) =>
    props.$size === "big" ? "90%" : props.$size === "small" ? "50%" : "100%"};
  // 너비는 해당 페이지에 따라서 조절 //modalPassword에서의 PC는 90%로, MOBILE은 50%로 함.
  border-radius: 8px;
  border: 2px solid ${(props) => (props.$error ? "#EB5230" : "#444")};
  background-color: #333;
  padding: ${(props) => (props.$size === "big" ? "14px" : "10px")};
  margin-bottom: ${(props) => (props.$error ? "20px" : "10px")};
`;

const StyledInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: ${gray_200};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

// const ErrorMessage = styled.p`
//   position: absolute;
//   bottom: -33px;
//   left: 5px;
//   font-size: 13px;
//   color: ${brand_orange};
// `;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: -33px;
  left: 5px;
  font-size: 13px;
  color: ${brand_orange};
  min-height: 0px;
  margin-top: 0px;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.2s ease;
`;
