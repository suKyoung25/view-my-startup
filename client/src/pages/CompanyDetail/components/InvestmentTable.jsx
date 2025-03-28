import React, { useState } from "react";
import styled from "styled-components";
import dropdown from "../../../assets/icon/btn_dropdown.png";
import ModalPassword from "../../../components/modal/Password";
import PopupOneButton from "../../../components/modal/PopupOneButton";

import {
  black_100,
  black_300,
  black_400,
  gray_100,
  gray_200,
  gray_300,
} from "../../../styles/colors";

function InvestmentTable({ data = [] }) {
  const sortedData = data.sort((a, b) => b.amount - a.amount);

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
        {sortedData.length === 0 ? (
          <Tr>
            <Td colSpan="5" className="no-investment-message">
              아직 투자한 기업이 없어요, 버튼을 눌러 기업에 투자해보세요
            </Td>
          </Tr>
        ) : (
          sortedData.map((investment, index) => (
            <InvestmentRow
              key={investment.id} // Use `id` for key to ensure uniqueness
              investment={investment}
              index={index}
            />
          ))
        )}
      </tbody>
    </Table>
  );
}

const InvestmentRow = ({ investment, index }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setIsPasswordModalOpen(true); // Open password modal to confirm deletion
  };

  const handlePasswordSubmit = (password) => {
    if (password === investment.encryptedPassword) {
      setPopupType("delete-success"); // Show success popup if passwords match
    } else {
      setPopupType("error"); // Show error popup if passwords do not match
    }
    setIsPopupOpen(true);
    setIsPasswordModalOpen(false);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Tr>
        <Td>{investment.investorName}</Td>
        <Td>{index + 1}위</Td>
        <Td>{investment.amount.toFixed(1)}억</Td>{" "}
        {/* Format the amount as a number */}
        <Td>{investment.comment}</Td>
        <Td>
          <Dropdown>
            <DropdownButton onClick={toggleDropdown}>
              <ArrowIcon src={dropdown} alt="화살표" />
            </DropdownButton>
            {isDropdownOpen && (
              <DropdownList>
                <DropdownItem>수정하기</DropdownItem>
                <DropdownItem onClick={handleDeleteClick}>
                  삭제하기
                </DropdownItem>
              </DropdownList>
            )}
          </Dropdown>
        </Td>
      </Tr>

      {isPasswordModalOpen && (
        <ModalPassword
          onClose={() => setIsPasswordModalOpen(false)}
          onDelete={handlePasswordSubmit}
        />
      )}

      {isPopupOpen && (
        <PopupOneButton
          onConfirm={handlePopupClose}
          onCancel={handlePopupClose}
          type={popupType}
        />
      )}
    </>
  );
};

export default InvestmentTable;

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
  border-bottom: 15px solid ${black_400}; /* thead와 tbody 사이 간격 */

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    width: 84px; /* Set width to 84px for 투자자 이름, 순위, 투자 금액 */
  }

  &:nth-child(4) {
    width: 884px; /* Set width to 884px for 투자 코멘트 */
  }

  &:nth-child(5) {
    width: 64px; /* Set width to 64px for the last column (Dropdown) */
  }
`;

const Td = styled.td`
  padding: 12px;
  text-align: center;
  font-size: 14px;
  height: 64px;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3) {
    width: 84px;
    text-align: center;
  }

  &:nth-child(4) {
    width: 884px;
    text-align: left;
    font-size: 14px;
    height: 64px;
  }

  &:nth-child(5) {
    width: 64px;
  }

  &.no-investment-message {
    background-color: ${black_400};
    color: ${gray_200};
    font-size: 14px;
    text-align: center;
    height: 150px;
  }
`;

const Tr = styled.tr`
  background-color: ${black_300};
  border-bottom: 1px solid ${gray_300}; /* 각 행 사이 가로줄 */

  &:last-child {
    border-bottom: none; /* 마지막 행에는 가로줄 제거 */
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const DropdownList = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  left: auto;
  right: 0;
  width: 144px;
  height: 80px;
  background-color: ${black_400};
  border: 1px solid ${gray_200};
  border-radius: 10px;
  overflow: hidden;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  white-space: nowrap;
  width: 100%;
  height: 50%;
  text-align: center;
  padding: 10px 16px;
  color: #fff;
  background-color: ${black_400};
  border: none;
  font-size: 12px;
  cursor: pointer;
  border-bottom: 1px solid ${gray_200};
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #212121;
  }
`;
