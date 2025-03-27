import React from "react";
import styled from "styled-components";
import { black_300 } from "../styles/colors";

function InputField({ variant = "default", children }) {
  return (
    <Outer $variant={variant}>
      {variant === "dashed" ? <Inner>{children}</Inner> : children}
    </Outer>
  );
}

export default InputField;

const Outer = styled.div`
  width: 1200px;
  height: 300px;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.$variant === "dashed" ? "transparent" : black_300};

  border: ${(props) =>
    props.$variant === "dashed" ? `1px dashed ${black_300}` : "none"};
`;

const Inner = styled.div`
  width: 1168px;
  height: 268px;
  background-color: ${black_300};
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
