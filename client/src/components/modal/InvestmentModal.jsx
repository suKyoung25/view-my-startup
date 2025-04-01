import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TextInputField, PasswordInputField } from "../Input";
import sampleLogo from "../../assets/images/company/sample.png";
import BtnLarge from "../BtnLarge";
import { black_300, black_400 } from "../../styles/colors";
import { media } from "../../styles/mixin";
import { useLocation, useParams } from "react-router-dom";
import companyAPI from "../../api/company.api";
import investmentAPI from "../../api/investment.api";

const InvestmentModal = ({ onClose, size, onSuccess, company }) => {
  //각 input들의 value를 state로 저장해둠
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueAmount, setInputValueAmount] = useState("");
  const [inputValueComment, setInputValueComment] = useState("");
  const [inputValuePassword, setInputValuePassword] = useState("");
  const [inputValueCheckPassword, setInputValueCheckPassword] = useState("");

  const [companyInformation, setCompanyInformation] = useState(null);
  const { companyId } = useParams();

  //useEffect를 사용하지 않고 투자하기 버튼 활성화 여부 확인
  const isInvestButtonAvailable =
    inputValueName.trim().length > 0 &&
    inputValueComment.trim().length > 0 &&
    Number(inputValueAmount) &&
    inputValuePassword === inputValueCheckPassword;

  // company가 없을 때만 API 호출
  useEffect(() => {
    if (company) {
      setCompanyInformation(company); // props로 받은 정보로 바로 세팅
    } else if (companyId) {
      const companyData = async () => {
        try {
          const data = await companyAPI.getCompanyById(companyId);
          setCompanyInformation(data);
        } catch (error) {
          console.error("Error fetching company data:", error);
        }
      };
      companyData();
    }
  }, [company, companyId]);
  

  //각 인풋의 핸들 함수
  const handleNameChange = (e) => {
    setInputValueName(e.target.value);
  };
  const handleAmountChange = (e) => {
    setInputValueAmount(e.target.value);
  };
  const handleCommentChange = (e) => {
    setInputValueComment(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setInputValuePassword(e.target.value);
  };
  const handleCheckPasswordChange = (e) => {
    setInputValueCheckPassword(e.target.value);
  };

  //투자하기 버튼이 눌렸을 시 이벤트 핸들러
  const handleClickInvestmentButton = async () => {
    try {
      const InvestmentData = await investmentAPI.postInvestment({
        investorName: inputValueName,
        amount: inputValueAmount,
        comment: inputValueComment,
        password: inputValuePassword,
        // 🔧 company가 있으면 그 id를, 아니면 useParams로 받은 id
        companyId: company.id, // 여기서 company.id로 고정
      });

      console.log(InvestmentData);
      setInputValueName("");
      setInputValueAmount("");
      setInputValueComment("");
      setInputValuePassword("");
      setInputValueCheckPassword("");

      onSuccess(); // 성공 팝업
      onClose();   // 모달 닫기
    } catch (e) {
      console.error("투자 등록 중 에러 발생...", e);
    }
  };

  if (!companyInformation) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>기업에 투자하기</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <Section>
          <SectionTitle>투자 기업 정보</SectionTitle>
          <CompanyInfo>
            <Logo src={companyInformation.imageUrl} alt={companyInformation.name} />
            <CompanyText>
              <CompanyName>{companyInformation.name}</CompanyName>
              <CompanyCategory>{companyInformation.category}</CompanyCategory>
            </CompanyText>
          </CompanyInfo>
        </Section>

        <Section>
          <FieldGroup>
            <FieldLabel>투자자 이름</FieldLabel>
            <TextInputField
              size={size}
              placeholder="투자자 이름을 입력해 주세요"
              value={inputValueName}
              onChange={handleNameChange}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>투자 금액</FieldLabel>
            <TextInputField
              size={size}
              placeholder="투자 금액을 입력해 주세요"
              value={inputValueAmount}
              onChange={handleAmountChange}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>투자 코멘트</FieldLabel>
            <TextArea
              placeholder="투자에 대한 코멘트를 입력해 주세요"
              value={inputValueComment}
              onChange={handleCommentChange}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>비밀번호</FieldLabel>
            <PasswordInputField
              size={size}
              placeholder="비밀번호를 입력해주세요"
              value={inputValuePassword}
              onChange={handlePasswordChange}
            />
          </FieldGroup>

          <FieldGroup>
            <FieldLabel>비밀번호 확인</FieldLabel>
            <PasswordInputField
              size={size}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={inputValueCheckPassword}
              onChange={handleCheckPasswordChange}
            />
          </FieldGroup>
        </Section>

        <ButtonRow>
          <BtnLarge type="" size={size} label="취소" onClick={onClose} />
          <BtnLarge
            type="orange"
            size={size}
            label="투자하기"
            onClick={handleClickInvestmentButton}
            disabled={!isInvestButtonAvailable}
          />
        </ButtonRow>
      </ModalWrapper>
    </Overlay>
  );
};

export default InvestmentModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${black_400}80;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background: ${black_300};
  padding: 24px;
  border-radius: 16px;
  width: ${(props) => (props.$size === "small" ? "343px" : "496px")};
  height: 858px;
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
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
  margin: 0 0 6px 0;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.h3`
  font-size: 18px;
  color: #ccc;
  margin: 0 0 6px 0;
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
  justify-content: center;
  gap: 12px;
  width: 100%;
`;
