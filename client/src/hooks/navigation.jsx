import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToSelectCompany = () => {
    navigate("/select-company");
  };

  const goToInvestStatus = () => {
    navigate("/invest-status");
  };

  const goToCompareStatus = () => {
    navigate("/compare-status");
  };

  const goToCompanyDetail = () => {
    navigate("/company-detail");
  };

  const goToCompareResults = () => {
    navigate("/select-company/compare-results");
  };

  return {
    goToHome,
    goToSelectCompany,
    goToInvestStatus,
    goToCompareStatus,
    goToCompanyDetail,
    goToCompareResults,
  };
}
