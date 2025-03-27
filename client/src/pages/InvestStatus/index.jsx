import React from "react";
import styled from "styled-components";
import { black_400, gray_100 } from "../../styles/colors";
import { media } from "../../styles/mixin";
import BtnPagination from "../../components/BtnPagination";
import UserTable from "../CompanyDetail/components/UserTable";
import Dropdown from "../../components/Dropdown";

function InvestState({ totalAmount = 200, investors = [] }) {
  return (
    <>
      <Wrap>
        <Content>
          <TopBar>
            <Title>투자 현황</Title>
            <Dropdown /> {/* 정렬 기준 선택 (e.g. 투자 금액 순 등) */}
          </TopBar>

          <TableWrap>
            <UserTable data={investors} />
          </TableWrap>

          <PaginationWrap>
            <BtnPagination size="big" />
          </PaginationWrap>
        </Content>
      </Wrap>
    </>
  );
}

export default InvestState;

const Wrap = styled.div`
  background-color: ${black_400};
  color: ${gray_100};
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 1200px;
  padding: 40px 0;

  ${media.mobile} {
    padding: 20px;
    width: 100%;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

const TableWrap = styled.div`
  margin-bottom: 32px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
