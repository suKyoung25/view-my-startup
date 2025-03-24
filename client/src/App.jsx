import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Routes from "./routes";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">{Routes()}</div>
    </>
  );
}

export default App;
