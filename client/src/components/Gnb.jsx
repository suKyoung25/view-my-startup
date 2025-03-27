import React from "react";
import styled from "styled-components";
import bigLogo from "../assets/images/gnb/standard=pc.svg";
import smallLogo from "../assets/images/gnb/standard=mobile.svg";
import { NavLink } from "react-router-dom";
import { gray_100, gray_200, black_400 } from "../styles/colors";

const getLinkStyle = ({ isActive }) => {
  return {
    color: isActive ? `${gray_100}` : undefined,
  };
};

// 아래 props는 length=big/medium/small
function Gnb({ length, color }) {
  const image =
    length === "big"
      ? bigLogo
      : length === "medium"
      ? bigLogo
      : length === "small"
      ? smallLogo
      : null;

  return (
    <Contatiner $length={length}>
      <NavLink to="/" style={getLinkStyle}>
        <Logo src={image} $length={length}></Logo>
      </NavLink>
      <Text $length={length}>
        <NavLink to="/select-company" style={getLinkStyle}>
          나의 기업 비교
        </NavLink>
        <NavLink to="/compare-status" style={getLinkStyle}>
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
  background-color: ${black_400};
  color: ${gray_200};

  font-size: ${(props) => {
    if (props.$length === "big") return "15px";
    if (props.$length === "medium") return "15px";
    if (props.$length === "small") return "12px";
    return "0";
  }};

  height: ${(props) => {
    if (props.$length === "big") return "60px";
    if (props.$length === "medium") return "60px";
    if (props.$length === "small") return "56px";
    return "0";
  }};
`;

const Logo = styled.img`
  width: ${(props) => {
    if (props.$length === "big") return "112px";
    if (props.$length === "medium") return "112px";
    if (props.$length === "small") return "64px";
    return "0";
  }};
  height: ${(props) => {
    if (props.$length === "big") return "40px";
    if (props.$length === "medium") return "40px";
    if (props.$length === "small") return "23px";
    return "0";
  }};
  padding-left: ${(props) => {
    if (props.$length === "big") return "360px";
    if (props.$length === "medium") return "24px";
    if (props.$length === "small") return "16px";
    return "0";
  }};
  padding-right: ${(props) => {
    if (props.$length === "big") return "57px";
    if (props.$length === "medium") return "41px";
    if (props.$length === "small") return "24px";
    return "0";
  }};
`;

const Text = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: ${(props) => {
    if (props.$length === "big") return "299px";
    if (props.$length === "medium") return "299px";
    if (props.$length === "small") return "212px";
  }};
`;

export default Gnb;
