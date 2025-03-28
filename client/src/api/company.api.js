import { client } from "./index.api";

// 기업 전체 리스트 가져오기
const getAllCompanies = async () => {
  const response = await client.get("/api/companies");
  return response.data;
};

// 특정 기업 상세 조회 추가
const getCompanyById = async (companyId) => {
  const response = await client.get(`/api/companies/${companyId}`);
  return response.data;
};

const companyAPI = {
  getAllCompanies,
  getCompanyById, // 추가된 함수
};

export default companyAPI;
