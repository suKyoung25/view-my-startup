// import React from "react";
// import styled from "styled-components";

// export default function TableHeader({ columns = [] }) {
//   return (
//     <HeaderWrapper>
//       <HeaderRow>
//         {columns.map(({ label, name, flex }, i) => (
//           <HeaderCell key={name || i} $flex={flex}>
//             <CellText>{label}</CellText>
//           </HeaderCell>
//         ))}
//       </HeaderRow>
//     </HeaderWrapper>
//   );
// }

// const HeaderWrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 16px;
//   box-sizing: border-box;
// `;

// const HeaderRow = styled.div`
//   display: flex;
//   width: 100%;
//   height: 35px;
//   background-color: #2e2e2e;
//   border-radius: 3px;
// `;

// const HeaderCell = styled.div`
//   flex: ${(props) => props.$flex};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 10 20px;
// `;

// const CellText = styled.span`
//   font-size: 13px;
//   font-weight: 500;
//   color: white;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

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
