import React, { useState } from "react";
import DataForm from "../../components/DataForm"; 
import { submitData } from "../../services/api"; 

function ScoutingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true); 
    setMessage(null); 
    setIsError(false); 

    try {
      const result = await submitData(formData); 

      if (result && result.error === false) {
        setMessage("數據提交成功！");
        setIsError(false);
      } else {
        throw new Error(result?.message || "後端提交數據失敗");
      }

    } catch (error) {
      setMessage(`數據提交失敗: ${error.message || "未知錯誤"}`); 
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Scouting</h1>
      <DataForm onSubmit={handleSubmit} initialValues={{}} />
      {isLoading && <p>提交中...</p>}
      {message && (
        <p className={isError ? "message error" : "message success"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ScoutingPage;
