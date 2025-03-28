import React from "react";
import styled from "styled-components";

export default function TableHeader({ columns = [] }) {
  return (
    <tr>
      {columns.map(({ label, name, width }, i) => (
        <Th key={name || i} style={{ width }}>
          {label}
        </Th>
      ))}
    </tr>
  );
}

const Th = styled.th`
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #2e2e2e;
  white-space: nowrap;
  text-align: center;
`;
