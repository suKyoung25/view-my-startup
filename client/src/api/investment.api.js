import { client } from "./index.api";

// 전체 개별 투자 내역
const getAllInvestment = async () => {
  const response = await client.get(`/api/investments`);
  return response.data;
};

// 기업별 누적 투자 요약
const getInvestmentStatus = async () => {
  const response = await client.get(`/api/investments/status`);
  return response.data;
};

const investmentAPI = {
  getAllInvestment,
  getInvestmentStatus,
};

export default investmentAPI;
