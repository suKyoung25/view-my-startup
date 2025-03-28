import { client } from "./index.api";

const getCompareStatus = async ({ sortBy, order }) => {
  const response = await client.get("/api/resultCompare", {
    params: { sortBy, order },
  });
  return response.data;
};

const resultCompareAPI = {
  getCompareStatus,
};

export default resultCompareAPI;
