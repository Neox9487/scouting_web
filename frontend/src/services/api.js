const API_BASE_URL = "http://localhost:8000";

// 將場次上傳至伺服器
export const submitData = async (data) => {
  try {
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
      throw new Error(`失敗!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();
    return reciveData;
  } 
  catch (error) {
    console.error("失敗!", error);
    throw error;
  }

};

// 刪除場次
export const deleteData = async (teamNumber, match) => {
  try {
    const response = await fetch(`${API_BASE_URL}/delete/`, 
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ team_number: teamNumber, match: match }),
      } 
    );

    if (!response.ok) {
       const errorData = await response.json();
       throw new Error(`失敗!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();
    return reciveData;
  } 
  catch (error) {
    throw error;
  }
};

// 更新場次資料
export const updateData = async (data, team_number, ) => {
  try {
    const response = await fetch( `${API_BASE_URL}/update/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, team_number })
      }
    ) 

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`失敗!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();
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
      throw new Error(`失敗!\n${response.status} ${response.statusText} - ${errorData.detail || ""}`);
    }

    const reciveData = await response.json();
    return reciveData;
  } 
  catch (error) {
    throw error;
  }
};