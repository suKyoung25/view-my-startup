import React, { useState } from "react";
import styled from "styled-components";
import eyeVisibleImg from "../assets/images/passwordEye/eye-visible.svg";
import eyeInvisibleImg from "../assets/images/passwordEye/eye-invisible.svg";
import { brand_orange, gray_200 } from "../styles/colors";

// 유저 이름 입력칸
export function TextInputField({ size, state, placeholder, value, onChange }) {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    if (value === "") {
      setIsTouched(true);
    }
  };

  // state가 "normal"이면 에러를 표시하지 않음
  const showError = state !== "normal" && isTouched && value === "";

  return (
    <Container $size={size} $error={showError} $state={state}>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsTouched(false)}
        onBlur={handleBlur}
      />
      <ErrorMessage $visible={showError}>*필수 입력사항입니다.</ErrorMessage>
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
  width: ${(props) => (props.$size === "small" ? "311px" : "448px")};
  border-radius: 8px;
  border: ${(props) =>
    props.$state === "normal"
      ? "2px solid #444" // normal 상태일 때 기본 테두리 유지
      : props.$error
      ? "2px solid #EB5230" // 에러 발생 시 빨간색 테두리
      : "2px solid #444"};
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
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.2s ease;

  /* state가 normal이면 숨김 */
  ${(props) => props.$state === "normal" && "display: none;"}
`;
