import React from "react";
import styled from "styled-components";
import longLogo from "../assets/images/gnb/bigLogo.png";
import shortLogo from "../assets/images/gnb/smallLogo.png";
import { NavLink } from "react-router-dom";

const getLinkStyle = ({ isActive }) => {
  return {
    color: isActive ? "#ffffff" : undefined,
  };
};

// 아래 props는 length=long/middle/short
function Gnb({ length, color }) {
  const image =
    length === "long"
      ? longLogo
      : length === "middle"
      ? longLogo
      : length === "short"
      ? shortLogo
      : null;

  return (
    <Contatiner $length={length}>
      <Logo src={image} $length={length}></Logo>
      <Text $length={length}>
        <NavLink to="/select-company" style={getLinkStyle}>
          나의 기업 비교
        </NavLink>
        <NavLink to="/company-status" style={getLinkStyle}>
          비교 현황
        </NavLink>
        <NavLink to="/invest-status" style={getLinkStyle}>
          투자 현황
        </NavLink>
      </Text>
    </Contatiner>
  );
}

const Contatiner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #131313;
  color: #747474;

  font-size: ${(props) => {
    if (props.$length === "long") return "15px";
    if (props.$length === "middle") return "15px";
    if (props.$length === "short") return "12px";
    return "0";
  }};

  height: ${(props) => {
    if (props.$length === "long") return "60px";
    if (props.$length === "middle") return "60px";
    if (props.$length === "short") return "56px";
    return "0";
  }};
`;

const Logo = styled.img`
  width: ${(props) => {
    if (props.$length === "long") return "112px";
    if (props.$length === "middle") return "112px";
    if (props.$length === "short") return "64px";
    return "0";
  }};
  height: ${(props) => {
    if (props.$length === "long") return "40px";
    if (props.$length === "middle") return "40px";
    if (props.$length === "short") return "23px";
    return "0";
  }};
  padding-left: ${(props) => {
    if (props.$length === "long") return "360px";
    if (props.$length === "middle") return "24px";
    if (props.$length === "short") return "16px";
    return "0";
  }};
  padding-right: ${(props) => {
    if (props.$length === "long") return "57px";
    if (props.$length === "middle") return "41px";
    if (props.$length === "short") return "24px";
    return "0";
  }};
`;

const Text = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: ${(props) => {
    if (props.$length === "long") return "299px";
    if (props.$length === "middle") return "299px";
    if (props.$length === "short") return "212px";
  }};
`;

export default Gnb;
