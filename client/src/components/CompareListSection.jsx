import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputField from "../components/InputField";
import BtnLarge from "../components/BtnLarge";
import { gray_200 } from "../styles/colors";
import SelectComparison from "../components/modal/SelectComparison";
import minusIcon from "../assets/icon/ic_minus.svg";

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

  const handleDelete = (id) => {
    const updated = selectedCompanies.filter((company) => company.id !== id);
    setSelectedCompanies(updated);
  };

  const renderSelectedCompanies = () => {
    return (
      <InputField variant="default" mediaSize={mediaSize}>
        {selectedCompanies.length === 0 ? (
          <EmptyText>
            아직 추가한 기업이 없어요. <br />
            버튼을 눌러 기업을 추가해보세요!
          </EmptyText>
        ) : (
          <CardGrid>
            {selectedCompanies.map((company, index) => (
              <CompanyCard key={index} $mediaSize={mediaSize}>
                <DeleteButton onClick={() => handleDelete(company.id)}>
                  <img src={minusIcon} alt="삭제" />
                </DeleteButton>
                <Logo
                  src={company.imageUrl || ""}
                  alt={`${company.name} 로고`}
                  $mediaSize={mediaSize}
                />
                <CompanyName>{company.name}</CompanyName>
                <CompanyCategory>{company.category}</CompanyCategory>
              </CompanyCard>
            ))}
          </CardGrid>
        )}
      </InputField>
    );
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

      {isModalOpen && (
        <SelectComparison
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          setSelectedCompanies={setSelectedCompanies}
          selectedCompanies={selectedCompanies}
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

const CardGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CompanyCard = styled.div`
  position: relative;
  width: ${({ $mediaSize }) => ($mediaSize === "small" ? "104px" : "126px")};
  height: ${({ $mediaSize }) => ($mediaSize === "small" ? "163px" : "187px")};
  background: #2c2c2c;
  border-radius: 8px;
  text-align: center;
`;

const DeleteButton = styled.button`
  position: absolute;
  margin: 8px;
  top: 6px;
  right: 6px;
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

const Logo = styled.img`
  width: ${({ $mediaSize }) => ($mediaSize === "small" ? "65px" : "80px")};
  height: ${({ $mediaSize }) => ($mediaSize === "small" ? "65px" : "80px")};
  object-fit: cover;
  border-radius: 50%;
  margin-top: 32px;
  margin-bottom: 10px;
`;

const CompanyName = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: bold;
`;

const CompanyCategory = styled.div`
  font-size: 14px;
  color: ${gray_200};
`;
