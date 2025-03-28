import { client } from "./index.api";

// const searchCompanies = async () => {
//   const response = await client.get(`/api/companies`);
//   return response.data;
// };

// const myCompanyAPI = {
//   searchCompanies,
// };

// export default myCompanyAPI;


const fetchCompareResults = async (myId, compareIds) => {
  const query = new URLSearchParams({
    myCompanyId: myId,
    compareCompanyIds: compareIds.join(","),
  });

  const res = await fetch(`/api/compare-results?${query.toString()}`);
  const data = await res.json();
  return data;
};
