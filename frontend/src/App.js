import React, { useState } from "react";
import ScoutingPage from "./pages/ScoutingPage/index";
import ManagePage from "./pages/ManagePage/index";  // 假設你有這個頁面

function App() {
  const [page, setPage] = useState("scouting");  // 預設顯示 ScoutingPage

  return (
    <div className="App">
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("scouting")}>Scouting Page</button>
        <button onClick={() => setPage("manage")}>Manage Page</button>
      </nav>

      {page === "scouting" && <ScoutingPage />}
      {page === "manage" && <ManagePage />}
    </div>
  );
}

export default App;
