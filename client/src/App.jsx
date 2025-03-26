import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";

import InvestmentModal from "./components/modal/InvestmentModal";

function App() {
  return (
    <div style={{ background: "#111", minHeight: "100vh", padding: "2rem" }}>
      {/* 모달 무조건 화면에 표시 */}
      <InvestmentModal onClose={() => {}} />
    </div>
  );
}

export default App;
