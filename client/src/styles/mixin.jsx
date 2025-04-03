import { css } from "styled-components";

export const sizes = {
  ipad: "1200px",
  mobile: "375px", // 태블릿 사이즈 최소 376px까지
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals, ...placeholders) => css`
    @media (max-width: ${sizes[label]}) {
      ${css(literals, ...placeholders)}
    }
  `;
  return acc;
}, {});
