import React from "react";
import styled from "styled-components";
import { TextInputField, PasswordInputField } from "../Input";
import sampleLogo from "../../assets/images/company/sample.png";
import BtnLarge from "../BtnLarge";
import BtnOutline from "../BtnOutline";

const InvestmentModal = ({ onClose }) => {
  const company = {
    name: "코드잇",
    category: "에듀테크",
    logoUrl: sampleLogo,
  };

  return (
    <ModalWrapper>
      <ModalHeader>
        <Title>기업에 투자하기</Title>
        <CloseButton onClick={onClose}>×</CloseButton>
      </ModalHeader>

      <Section>
        <SectionTitle>투자 기업 정보</SectionTitle>
        <CompanyInfo>
          <Logo src={company.logoUrl} alt={company.name} />
          <CompanyText>
            <CompanyName>{company.name}</CompanyName>
            <CompanyCategory>{company.category}</CompanyCategory>
          </CompanyText>
        </CompanyInfo>
      </Section>

      <Section>
        <FieldGroup>
          <FieldLabel>투자자 이름</FieldLabel>
          <TextInputField
            size="big"
            placeholder="투자자 이름을 입력해 주세요"
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>투자 금액</FieldLabel>
          <TextInputField size="big" placeholder="투자 금액을 입력해 주세요" />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>투자 코멘트</FieldLabel>
          <TextArea placeholder="투자에 대한 코멘트를 입력해 주세요" />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>비밀번호</FieldLabel>
          <PasswordInputField
            size="big"
            placeholder="비밀번호를 입력해주세요"
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>비밀번호 확인</FieldLabel>
          <PasswordInputField
            size="big"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
        </FieldGroup>
      </Section>

      <ButtonRow>
        <BtnOutline text="cancel" type="orange" size="big" />
        <BtnLarge type="orange" size="big" label="투자하기" />
      </ButtonRow>
    </ModalWrapper>
  );
};

export default InvestmentModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #212121;
  padding: 24px;
  border-radius: 16px;
  width: 496px;
  height: 858px;
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #fff;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
`;

const Section = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: #ccc;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.h3`
  font-size: 18px;
  color: #ccc;
  margin: 0;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CompanyText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.span`
  font-weight: bold;
  color: #fff;
`;

const CompanyCategory = styled.span`
  font-size: 12px;
  color: #aaa;
`;

const TextArea = styled.textarea`
  width: 90%;
  background-color: #333;
  color: #fff;
  border: 2px solid #444;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  resize: none;
  outline: none;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #3692ff;
  }
`;

const ButtonRow = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;
