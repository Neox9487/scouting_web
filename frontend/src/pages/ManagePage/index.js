import React, {useState, useEffect } from "react";

import DataForm from "../../components/DataForm";
import { fetchData, updateData, deleteData } from "../../services/api";

function ManagePage() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const sortData = (sortType) => {

  }

  const handleDelete = (teamNumber, match) => {

  }

  const handleUpdate = (data) => {

  }

  const refresh = () => {

  }
}

export default ManagePage;