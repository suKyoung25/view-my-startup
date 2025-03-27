import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { black_300 } from "../styles/colors";

function InputField({ variant = "default", children }) {
  const [mediaSize, setMediaSize] = useState("big");

  useEffect(() => {
    const updateMediaSize = () => {
      const width = window.innerWidth;
      if (width >= 1200) setMediaSize("big");
      else if (width > 744) setMediaSize("medium");
      else setMediaSize("small");
    };

    updateMediaSize();
    window.addEventListener("resize", updateMediaSize);
    return () => window.removeEventListener("resize", updateMediaSize);
  }, []);

  return (
    <Outer $variant={variant} $mediaSize={mediaSize}>
      {variant === "dashed" ? (
        <Inner $mediaSize={mediaSize}>{children}</Inner>
      ) : (
        children
      )}
    </Outer>
  );
}

export default InputField;

const Outer = styled.div`
  width: ${({ $mediaSize }) =>
    $mediaSize === "big"
      ? "1200px"
      : $mediaSize === "medium"
      ? "696px"
      : "343px"};

  height: ${({ $mediaSize }) =>
    $mediaSize === "big"
      ? "300px"
      : $mediaSize === "medium"
      ? "239px"
      : "179px"};

  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  background-color: ${({ $variant }) =>
    $variant === "dashed" ? "transparent" : black_300};

  border: ${({ $variant }) =>
    $variant === "dashed" ? `1px dashed ${black_300}` : "none"};
`;

const Inner = styled.div`
  width: ${({ $mediaSize }) =>
    $mediaSize === "big"
      ? "1168px"
      : $mediaSize === "medium"
      ? "664px"
      : "311px"};

  height: ${({ $mediaSize }) =>
    $mediaSize === "big"
      ? "268px"
      : $mediaSize === "medium"
      ? "207px"
      : "147px"};

  background-color: ${black_300};
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;
