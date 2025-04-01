import { client } from "./index.api";

// 전체 개별 투자 내역
const getAllInvestment = async () => {
  const response = await client.get(`/api/investments`);
  return response.data;
};

// 기업별 누적 투자 요약 - 정렬 기준 포함
const getInvestmentStatus = async (sortBy, order) => {
  const response = await client.get(`/api/investments/status`, {
    params: { sortBy, order },
  });
  return response.data;
};

//특정 기업에 투자하기
const postInvestment = async (options) => {
  const response = await client.post("/api/investments", options);
  return response.data;
};

const investmentAPI = {
  getAllInvestment,
  getInvestmentStatus,
  postInvestment,
};

export default investmentAPI;
