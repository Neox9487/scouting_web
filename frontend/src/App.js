import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Failed to connect."));
  }, []);

  return (
    <div className="App">
      <h1>FRC Scouting Web</h1>
      <p>後端訊息：{message}</p>
    </div>
  );
}

export default App;