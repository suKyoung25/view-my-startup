import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "../components/InputField";
import BtnLarge from "../components/BtnLarge";
import { gray_200 } from "../styles/colors";
import SelectComparison from "../components/modal/SelectComparison";

const CompareListSection = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaSize, setMediaSize] = useState("");

  function updateMediaSize() {
    const { innerWidth: width } = window;
    if (width >= 1200) {
      setMediaSize("big");
    } else if (width > 744) {
      setMediaSize("medium");
    } else {
      setMediaSize("small");
    }
  }

  useEffect(() => {
    updateMediaSize();
    window.addEventListener("resize", updateMediaSize);
    return () => {
      window.removeEventListener("resize", updateMediaSize);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderSelectedCompanies = () => {
    if (selectedCompanies.length === 0) {
      return (
        <InputField variant="default" mediaSize={mediaSize}>
          <EmptyText>
            아직 추가한 기업이 없어요. <br />
            버튼을 눌러 기업을 추가해보세요!
          </EmptyText>
        </InputField>
      );
    }

    return selectedCompanies.map((company, index) => (
      <CompanyCard key={index}>{company.name}</CompanyCard>
    ));
  };

  return (
    <Wrapper $mediaSize={mediaSize}>
      <Header $mediaSize={mediaSize}>
        <Title>어떤 기업이 궁금하세요?</Title>
        <BtnLarge
          label="기업 추가하기"
          type="orange"
          size="small"
          onClick={handleOpenModal}
        />
      </Header>

      <CardContainer>{renderSelectedCompanies()}</CardContainer>

      {/* <ButtonWrapper>
        <BtnLarge
          label="기업 비교하기"
          type={selectedCompanies.length === 0 ? "black" : "orange"}
          size="big"
          disabled={selectedCompanies.length === 0}
        />
      </ButtonWrapper> */}

      {isModalOpen && (
        <SelectComparison
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setSelectedCompanies={setSelectedCompanies}
          size={mediaSize === "small" ? "small" : "big"}
        />
      )}
    </Wrapper>
  );
};

export default CompareListSection;

const Wrapper = styled.section`
  padding: ${({ $mediaSize }) =>
    $mediaSize === "big" ? "32px" : $mediaSize === "medium" ? "24px" : "16px"};
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: ${({ $mediaSize }) =>
    $mediaSize === "small" ? "column" : "row"};
  justify-content: space-between;
  align-items: ${({ $mediaSize }) =>
    $mediaSize === "small" ? "flex-start" : "center"};
  gap: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

const CardContainer = styled.div`
  min-height: 150px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyText = styled.p`
  color: ${gray_200};
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`;

const CompanyCard = styled.div`
  padding: 12px;
  border-radius: 8px;
`;

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 24px;
// `;
