import { useEffect, useState } from "react";
import styled from "styled-components";

// 아래 props는 type=</> size=big/small
function BtnRight({ size }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    // e.preventDefault();
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  useEffect(() => {
    setIsClicked(false);
  }, []);

  return (
    <Button $size={size} $isClicked={isClicked} onClick={handleClick}>
      <div>&gt;</div>
    </Button>
  );
}

const Button = styled.div`
  background-color: ${(props) => {
    return props.$isClicked ? "#EB5230" : "#2E2E2E";
  }};

  color: ${(props) => {
    return props.$isClicked ? "#FFFFFF" : "#747474";
  }};

  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => {
    if (props.$size === "big") return "18px";
    if (props.$size === "small") return "16px";
  }};

  width: ${(props) => {
    if (props.$size === "big") return "48px";
    if (props.$size === "small") return "32px";
  }};

  height: ${(props) => {
    if (props.$size === "big") return "48px";
    if (props.$size === "small") return "32px";
  }};
`;

export default BtnRight;
