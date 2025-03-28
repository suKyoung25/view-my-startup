import { client } from "./index.api";

// 기업 전체 리스트 가져오기
const getAllCompanies = async () => {
  const response = await client.get("/api/companies");
  return response.data;
};

const companyAPI = {
  getAllCompanies,
};

export default companyAPI;
