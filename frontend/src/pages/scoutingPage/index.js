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
        setMessage("Finished!\nReload the page to submit another data.");
        setIsError(false);
      } else {
        throw new Error(result?.message || "Failed!");
      }

    } catch (error) {
      setMessage(`Failed: ${error.message || "IDK what happened"}`); 
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scouting-page">
      <DataForm onSubmit={handleSubmit} initialData={null}/>
      {message && (
        <p className={isError ? "error" : "message"}>
          {message}
        </p>
      )}
      {isLoading && <h2>提交中...</h2>}
    </div>
  );
}

export default ScoutingPage;
