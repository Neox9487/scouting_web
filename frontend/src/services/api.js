const API_BASE_URL = process.env.REACT_APP_API_URL

// 將場次上傳至伺服器
export const submitData = async (data) => {
  try {
    console.log("Submitting data:", data);
    const response = await fetch(`${API_BASE_URL}/submit/`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(`Failed!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();
    if (reciveData.error === true) {
      throw new Error(`Failed!\n${reciveData.message}`);
    }
    return reciveData;
  } 
  catch (error) {
    console.error("Failed!", error);
    throw error;
  }

};

// 刪除場次
export const deleteData = async (teamNumber, match) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete/`, 
      {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ team_number: teamNumber, match: match }),
      } 
    );

    if (!response.ok) {
       const errorData = await response.json();
       throw new Error(`Failed!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();

    if (reciveData.error === true) {
      throw new Error(`Failed!\n${reciveData.message}`);
    }

    return reciveData;
  } 
  catch (error) {
    throw error;
  }
};

// 更新場次資料
export const updateData = async (data) => {
  try {
    const response = await fetch( `${API_BASE_URL}/update/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    ) 

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failde!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();

    if (reciveData.error === true) {
      throw new Error(`Failed!\n${reciveData.message}`);
    }

    return reciveData;
  }
  catch (error) {
    throw error;
  }
}

// 取得所有場次資料
export const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/fetch/`, 
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();
    return reciveData;
  } 
  catch (error) {
    throw error;
  }
};