import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Search from "../Search";
import closeIcon from "../../assets/icon/ic_delete.png";
import {
  black_300,
  black_400,
  brand_orange,
  gray_200,
} from "../../styles/colors";
import { client } from "../../api/index.api";
import Hangul from "hangul-js";

function SelectMyEnterprise({
  isOpen,
  onClose,
  size,
  onSelect,
  recentCompanies,
  setRecentCompanies,
  excludeCompanies,
}) {
  const [keyword, setKeyword] = useState("");
  const [searchTokens, setSearchTokens] = useState({
    raw: "",
    disassembled: "",
    cho: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // '최근 선택된 기업' 저장 state
  // const [recentSelectedCompanies, setRecentSelectedCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await client.get("/api/companies");
        setCompanies(res.data);
      } catch (e) {
        console.error("기업 불러오기 실패:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // 해당 기업이 제외목록에 있는지 확인
  const isExcluded = (company) => {
    return excludeCompanies.some((excluded) => excluded.id === company.id);
  };

  const filteredCompanies = useMemo(() => {
    const input = searchTokens.raw.toLowerCase();
    if (!input || companies.length === 0) return [];

    return companies.filter((company) => {
      const name = company.name.toLowerCase();
      const matchesSearchTerm =
        name.includes(searchTerm.toLowerCase()) && !isExcluded(company);

      if (!matchesSearchTerm) return false;
      // const lower = name.toLowerCase();

      if (Hangul.isConsonant(input[0])) {
        // 기업 이름의 첫 글자 초성과 비교
        const firstChar = name[0];
        const disassembled = Hangul.disassemble(firstChar);
        return disassembled.length > 0 && disassembled[0] === input[0];
      } else {
        // 이름이 입력으로 시작하는지 체크
        return name.includes(input);
      }
    });
  }, [searchTokens, companies]);

  const totalPages = Math.ceil(filteredCompanies.length / perPage);
  const currentData = filteredCompanies.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleCompanySelect = (company) => {
    if (onSelect) {
      onSelect(company);
    }
    setRecentCompanies((prev) => {
      const existingIndex = prev.findIndex((c) => c.id === company.id);
      if (existingIndex !== -1) {
        const updatedRecent = [
          company,
          ...prev.slice(0, existingIndex),
          ...prev.slice(existingIndex + 1),
        ];
        return updatedRecent.slice(0, 5);
      }
      return [company, ...prev].slice(0, 5);
    });
  };

  // const handleCompanyRemove = (id) => {
  //   setRecentSelectedCompanies((prev) =>
  //     prev.filter((company) => company.id !== id)
  //   );
  //   setSelectedCompanies((prev) => prev.filter((company) => company.id !== id));
  // };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container $size={size} onClick={(e) => e.stopPropagation()}>
        <Title>
          <div>나의 기업 선택하기</div>
          <img onClick={onClose} src={closeIcon} alt="닫기" />
        </Title>
        <Search
          size={size}
          state="searching"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onClear={() => {
            setKeyword("");
            setSearchTokens({ raw: "", disassembled: "", cho: "" });
          }}
          onSearch={(tokens) => {
            setSearchTokens(tokens);
            setCurrentPage(1);
          }}
        />

        {/* 최근 선택된 기업 */}
        {recentCompanies.length > 0 && (
          <>
            <SectionTitle>
              최근 선택된 기업 ({recentCompanies.length})
            </SectionTitle>
            <CompanyList>
              {recentCompanies.map((company) => (
                <CompanyItem key={company.id}>
                  <CompanyCell>
                    <Logo
                      src={company.imageUrl || "/default-image.png"}
                      alt={`${company.name} 로고`}
                    />
                    <Info>
                      <div className="name">{company.name}</div>
                      <div className="tagline">{company.category}</div>
                    </Info>
                  </CompanyCell>
                  <SelectBtn onClick={() => handleCompanySelect(company)}>
                    선택하기
                  </SelectBtn>
                </CompanyItem>
              ))}
            </CompanyList>
          </>
        )}

        {/* 검색 결과 */}
        {keyword.trim() !== "" && (
          <>
            <SectionTitle>검색 결과 ({filteredCompanies.length})</SectionTitle>
            <CompanyList>
              {filteredCompanies
                .filter(
                  (company) =>
                    !excludeCompanies.some(
                      (excluded) => excluded.id === company.id
                    )
                )
                .map((c) => (
                  <CompanyItem key={c.id}>
                    <CompanyCell>
                      <Logo
                        src={c.imageUrl || "/default-image.png"}
                        alt={`${c.name} 로고`}
                      />
                      <Info>
                        <div className="name">{c.name}</div>
                        <div className="tagline">{c.category}</div>
                      </Info>
                    </CompanyCell>
                    <SelectBtn onClick={() => handleCompanySelect(c)}>
                      선택하기
                    </SelectBtn>
                  </CompanyItem>
                ))}
            </CompanyList>
            <Pagination>
              {[...Array(totalPages)].map((_, i) => (
                <PageBtn
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  $active={currentPage === i + 1}
                >
                  {i + 1}
                </PageBtn>
              ))}
            </Pagination>
          </>
        )}
      </Container>
    </Overlay>
  );
}

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
  z-index: 999;
`;

const Container = styled.div`
  background-color: ${black_300};
  border-radius: 16px;
  padding: 24px;
  color: #ffffff;
  font-size: 20px;
  width: ${(props) =>
    props.$size === "big"
      ? "496px"
      : props.$size === "small"
      ? "343px"
      : "100%"};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const SectionTitle = styled.div`
  font-size: 14px;
  color: #aaa;
  margin: 20px 0 12px;
`;

const CompanyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

const CompanyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${black_300};
  padding: 10px 12px;
  border-radius: 8px;

  .name {
    font-size: 14px;
    font-weight: bold;
  }

  .tagline {
    font-size: 12px;
    color: ${gray_200};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectBtn = styled.button`
  background-color: transparent;
  border: 1px solid ${brand_orange};
  color: ${brand_orange};
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const PageBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? brand_orange : black_400)};
  color: ${(props) => (props.$active ? "white" : "#aaa")};
  border: none;
  cursor: pointer;
  font-size: 14px;
`;

const CompanyCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export default SelectMyEnterprise;
