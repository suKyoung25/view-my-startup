import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import arrowDown from "../assets/images/dropdownarrow/arrow.svg";
import { gray_200 } from "../styles/colors";

const SORT_OPTIONS = [
  "View My Startup 투자 금액 높은순",
  "누적 투자금액 높은순",
  "누적 투자금액 낮은순",
  "매출액 높은순",
  "매출액 낮은순",
  "고용 인원 많은순",
  "고용 인원 적은순",
];

function SortDropdown({ size }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);
  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  // 칸 밖에서 클릭할 때에도 list가 닫히게
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <DropdownButton $size={size} onClick={toggleDropdown}>
        <SelectedText>{selected}</SelectedText>
        <ArrowIcon src={arrowDown} alt="화살표" $isOpen={open} />
      </DropdownButton>

      <DropdownList $isOpen={open}>
        {SORT_OPTIONS.map((option) => (
          <DropdownItem key={option} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #000;
  color: #fff;
  border: 1px solid ${gray_200};
  border-radius: 14px;
  width: ${(props) => (props.$size === "big" ? "280px" : "240px")};
  height: ${(props) => (props.$size === "big" ? "44px" : "39px")};
  padding: 0 16px;

  font-size: ${(props) => (props.$size === "big" ? "14px" : "12px")};
  cursor: pointer;
`;

const SelectedText = styled.span`
  text-align: left;
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  background-color: #000;
  border: 1px solid #000;
  border-radius: 14px;
  overflow: hidden;
  z-index: 1000;

  transform-origin: top;
  animation: ${(props) =>
    props.$isOpen
      ? css`
          ${slideDown} 0.2s ease forwards
        `
      : "none"};

  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  color: #fff;
  background-color: #000;
  border: none;
  font-size: 12px;
  cursor: pointer;

  border-bottom: 1px solid #555;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #212121;
    color: #fff;
  }
`;

export default SortDropdown;
