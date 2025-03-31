import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../Search";
import closeIcon from "../../assets/icon/ic_delete.png";
import BtnPagination from "../BtnPagination";
import BtnOutline from "../BtnOutline";
import { black_300, black_400, gray_200 } from "../../styles/colors";

function SelectComparison({
  isOpen,
  onClose,
  size,
  selectedCompanies,
  setSelectedCompanies,
}) {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonSize, setButtonSize] = useState("big");
  const [searchSize, setSearchSize] = useState("big");
  const itemsPerPage = 5;

  const isSearching = searchTerm.trim() !== "";

  const modalHeight =
    isSearching || selectedCompanies.length > 0
      ? "858px"
      : size === "small"
      ? "112px"
      : "152px";

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth <= 744;

      setButtonSize(isMobile ? "small" : "big");
      setSearchSize(isMobile ? "medium" : "big");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:7777/api/companies")
        .then((res) => res.json())
        .then((data) => setCompanies(data))
        .catch((err) => console.error("기업 데이터 가져오기 실패", err));
    }
  }, [isOpen]);

  const handleSelect = (company) => {
    if (selectedCompanies.length >= 5) {
      alert("비교할 기업은 최대 5개까지 선택 가능합니다.");
      return;
    }

    if (selectedCompanies.some((c) => c.id === company.id)) return;

    setSelectedCompanies((prev) => [...prev, company]);
  };

  const handleRemove = (id) => {
    setSelectedCompanies((prev) => prev.filter((company) => company.id !== id));
  };

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper
        $size={size}
        $height={modalHeight}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <div>비교할 기업 선택하기</div>
          <img onClick={onClose} src={closeIcon} alt="닫기" />
        </ModalHeader>

        <Search
          size={searchSize}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {selectedCompanies.length > 0 && (
          <>
            <SectionTitle>
              선택한 기업 ({selectedCompanies.length})
            </SectionTitle>
            {selectedCompanies.map((company) => (
              <CompanyCard key={company.id}>
                <CompanyInfo>
                  {company.imageUrl ? (
                    <Logo src={company.imageUrl} alt={`${company.name} 로고`} />
                  ) : (
                    <LogoPlaceholder />
                  )}
                  <CompanyText>
                    <div>{company.name}</div>
                    <div>{company.category}</div>
                  </CompanyText>
                </CompanyInfo>
                <BtnOutline
                  text="cancel"
                  type="black"
                  size="small"
                  onClick={() => handleRemove(company.id)}
                />
              </CompanyCard>
            ))}
            <Divider />
          </>
        )}

        {isSearching && (
          <>
            <SectionTitle>검색 결과 ({filteredCompanies.length})</SectionTitle>
            {currentCompanies.map((company) => {
              const isSelected = selectedCompanies.some(
                (c) => c.id === company.id
              );

              return (
                <CompanyCard key={company.id}>
                  <CompanyInfo>
                    {company.imageUrl ? (
                      <Logo
                        src={company.imageUrl}
                        alt={`${company.name} 로고`}
                      />
                    ) : (
                      <LogoPlaceholder />
                    )}
                    <CompanyText>
                      <div>{company.name}</div>
                      <div>{company.category}</div>
                    </CompanyText>
                  </CompanyInfo>
                  {isSelected ? (
                    <BtnOutline
                      text="complete"
                      type="black"
                      size={buttonSize}
                      src="existSmall"
                    />
                  ) : (
                    <BtnOutline
                      text="choice"
                      type="orange"
                      size={buttonSize}
                      onClick={() => handleSelect(company)}
                    />
                  )}
                </CompanyCard>
              );
            })}

            <PaginationWrapper>
              <BtnPagination
                size="small"
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={filteredCompanies.length}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </PaginationWrapper>

            {selectedCompanies.length >= 5 && (
              <Warning>*비교할 기업은 최대 5개까지 선택 가능합니다.</Warning>
            )}
          </>
        )}
      </ModalWrapper>
    </Overlay>
  );
}

export default SelectComparison;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${black_400}80;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
`;

const ModalWrapper = styled.div`
  background: ${black_300};
  padding: 24px;
  border-radius: 16px;
  width: ${(props) => (props.$size === "small" ? "343px" : "496px")};
  max-height: 90vh;
  overflow-y: auto;
  height: fit-content;
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  img {
    cursor: pointer;
  }
`;

const SectionTitle = styled.div`
  font-size: 16px;
  margin: 16px 0 8px;
`;

const CompanyCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const LogoPlaceholder = styled.div`
  width: 36px;
  height: 36px;
  background-color: #888;
  border-radius: 50%;
`;

const CompanyText = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  align-items: baseline;

  div:first-child {
    font-size: 16px;
    font-weight: bold;
  }

  div:last-child {
    font-size: 14px;
    margin: 8px;
    color: ${gray_200};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #444;
  margin: 16px 0;
`;

const PaginationWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`;

const Warning = styled.p`
  color: #ff5f5f;
  font-size: 13px;
  text-align: right;
  margin-top: 12px;
`;
