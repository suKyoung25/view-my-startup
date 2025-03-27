import React from "react";
import styled from "styled-components";
import {
  black_100,
  black_200,
  black_400,
  gray_100,
  gray_200,
} from "../../../styles/colors";

function UserTable({ data = [] }) {
  // 투자 금액 기준 내림차순 정렬 후 순위 부여
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <Table>
      <thead>
        <tr>
          <Th>투자자 이름</Th>
          <Th>순위</Th>
          <Th>투자 금액</Th>
          <Th>투자 코멘트</Th>
          <Th></Th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((user, index) => (
          <Tr key={user.name}>
            <Td>{user.name}</Td>
            <Td>{index + 1}위</Td>
            <Td>{user.amount}억</Td>
            <Td>{user.comment}</Td>
            <Td>
              <Dropdown>
                <button>수정하기</button>
                <button>삭제하기</button>
              </Dropdown>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${black_400};
  color: ${gray_100};
`;

const Th = styled.th`
  padding: 12px;
  background-color: ${black_100};
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: ${black_200};
  }
`;

const Td = styled.td`
  padding: 12px;
  text-align: center;
  font-size: 14px;
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  button {
    background: ${gray_200};
    border: none;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
  }

  button:hover {
    background: ${gray_100};
  }
`;
