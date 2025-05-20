import React, {useState, useEffect} from "react";

import Selections from "../../components/widgets/Selections";

import DataForm from "../../components/DataForm";
import { fetchData, updateData, deleteData } from "../../services/api";

// data module:
// {
//   team_number: 0,
//   match: 0,
//   auto: {
//     leave: false,
//     coral_l1: 0,
//     coral_l2: 0,
//     coral_l3: 0,
//     coral_l4: 0,
//     processor: 0,
//     net: 0,
//   },
//   teleop: {
//     coral_l1: 0,
//     coral_l2: 0,
//     coral_l3: 0,
//     coral_l4: 0,
//     processor: 0,
//     net: 0,
//     barge: "none",
//   },
//   note: "",
// }

const SortOptions = [
  { label: "Team Number", value: "team_number" },
  { label: "Match", value: "match" },
  { label: "Auto Score", value: "auto" },
  { label: "Teleop Score", value: "teleop" },
  { label: "Processor", value: "processor" },
  { label: "Net", value: "net" },
  { label: "L4", value: "L4" },
  { label: "L3", value: "L3" },
  { label: "L2", value: "L2" },
  { label: "L1", value: "L1" },
];

function ManagePage() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [sortType, setSortType] = useState("team_number");

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData();
        setData(response.data);
      } catch (error) {
        setIsError(true);
        setMessage("Error fetching data");
      }
      setIsLoading(false);
    }
    fetchDataFromAPI();
  }, []);

  const sortDataBy = (type) => {
    const sortedData = [...data].sort((a, b) => {
      if (type === "team_number") {
        return a.team_number - b.team_number;
      } else if (type === "match") {
        return a.match - b.match;
      } else if (type === "auto") {
        return (a.auto.leave*4 +a.auto.coral_l1*3 + a.auto.coral_l2*4 + a.auto.coral_l3*6 + a.auto.coral_l4*6 + a.auto.processor*6 + a.auto.net*4) - 
               (b.auto.leave*4 +b.auto.coral_l1*3 + b.auto.coral_l2*4 + b.auto.coral_l3*6 + b.auto.coral_l4*6 + b.auto.processor*6 + b.auto.net*4);
      } else if (type === "teleop") {
        // teleop score
        let a_score = a.teleop.coral_l1*3 + a.teleop.coral_l2*4 + a.teleop.coral_l3*6 + a.teleop.coral_l4*6 + a.teleop.processor*6 + a.teleop.net*4;
        let b_score = b.teleop.coral_l1*3 + b.teleop.coral_l2*4 + b.teleop.coral_l3*6 + b.teleop.coral_l4*6 + b.teleop.processor*6 + b.teleop.net*4;

        if (a.teleop.barge === "none") {
          a_score += 0;
        } else if (a.teleop.barge === "park") {
          a_score += 2;
        }
        else if (a.teleop.barge === "shallow_cage") {
          a_score += 6;
        }
        else if (a.teleop.barge === "deep_cage") {
          a_score += 12;
        }

        if (b.teleop.barge === "none") {
          a_score += 0;
        } else if (b.teleop.barge === "park") {
          a_score += 2;
        }
        else if (b.teleop.barge === "shallow_cage") {
          a_score += 6;
        }
        else if (b.teleop.barge === "deep_cage") {
          a_score += 12;
        }
        return a_score - b_score;
      } else if (type === "processor") {
        return (a.auto.processor + a.teleop.processor) - (b.auto.processor + b.teleop.processor);
      } else if (type === "net") {
        return (a.auto.net + a.teleop.net) - (b.auto.net + b.teleop.net);
      } else if (type === "L4") {
        return (a.auto.coral_l4 + a.teleop.coral_l4) - (b.auto.coral_l4 + b.teleop.coral_l4);
      } else if (type === "L3") {
        return (a.auto.coral_l3 + a.teleop.coral_l3) - (b.auto.coral_l3 + b.teleop.coral_l3);
      } else if (type === "L2") {
        return (a.auto.coral_l2 + a.teleop.coral_l2) - (b.auto.coral_l2 + b.teleop.coral_l2);
      } else if (type === "L1") {
        return (a.auto.coral_l1 + a.teleop.coral_l1) - (b.auto.coral_l1 + b.teleop.coral_l1);
      }
    })
  }

  const handleDelete = (teamNumber, match) => {
    const deleteDataFromAPI = async () => {
      setIsLoading(true);
      try {
        const response = await deleteData(teamNumber, match);
        if (response.error === false) {
          setMessage("Delete success");
          refresh();
          setIsError(false);
        }
        else {
          setMessage("Delete failed");
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        setMessage("Error deleting data");
      }
      setIsLoading(false);
    }
    deleteDataFromAPI();
  }

  const handleUpdate = (data) => {
    const updateDataFromAPI = async () => {
      setIsLoading(true);
      try {
        const response = await updateData(data);
        if (response.error === false) {
          setMessage("Update success");
          refresh();
          setIsError(false);
        }
        else {
          setMessage("Update failed");
          setIsError(true);
        }
      }
      catch (error) {
        setIsError(true);
        setMessage("Error updating data");
      }
      setIsLoading(false);
    }
    updateDataFromAPI();
  }

  const refresh = () => {
    const fetchDataFromAPI = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData();
        if (response.error === false) {
          setData(response.data);
          setMessage("Refresh success");
          setIsError(false);
        }
        else {
          setMessage("Refresh failed");
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        setMessage("Error fetching data");
      }
      setIsLoading(false);
    }
    fetchDataFromAPI();
  }

  return (
    <>
      <div className="manage-page">
        <h1>Manage Page</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p className="error">{message}</p>}
        {message && <p className={isError ? "error" : "success"}>{message}</p>}
        <button onClick={refresh}>Refresh</button>
        <div className="data-table">
          {/* Sort buttons */}
          <div className="sort-buttons">
            {SortOptions.map((option) => (
              <Selections
                key={option.value}
                label={option.label}
                options={SortOptions}
                value={sortType}
                onChange={(selectedValue) => {
                  setSortType(selectedValue.value);
                  sortDataBy(selectedValue.value);
                }}
              />
            ))}
          </div>
          {/* Data table */}
          <table>
            <thead>
              <tr>
                <th>Team Number</th>
                <th>Match</th>
                <th>Auto Score</th>
                <th>Teleop Score</th>
                <th>Processor</th>
                <th>Net</th>
                <th>L4</th>
                <th>L3</th>
                <th>L2</th>
                <th>L1</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={`${item.team_number}-${item.match}`}>
                  <td>{item.team_number}</td>
                  <td>{item.match}</td>
                  <td>{(item.auto.leave*4 +item.auto.coral_l1*3 + item.auto.coral_l2*4 + item.auto.coral_l3*6 + item.auto.coral_l4*6 + item.auto.processor*6 + item.auto.net*4)}</td>
                  <td>{(item.teleop.coral_l1*3 + item.teleop.coral_l2*4 + item.teleop.coral_l3*6 + item.teleop.coral_l4*6 + item.teleop.processor*6 + item.teleop.net*4)}</td>
                  <td>{item.auto.processor + item.teleop.processor}</td>
                  <td>{item.auto.net + item.teleop.net}</td>
                  <td>{item.auto.coral_l4 + item.teleop.coral_l4}</td>
                  <td>{item.auto.coral_l3 + item.teleop.coral_l3}</td>
                  <td>{item.auto.coral_l2 + item.teleop.coral_l2}</td>
                  <td>{item.auto.coral_l1 + item.teleop.coral_l1}</td>
                  <td>
                    <button onClick={() => setEditing(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.team_number, item.match)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editing && (
          <DataForm
            initialData={editing}
            onSubmit={handleUpdate}
          />
        )}
      </div>
    </>
  )
}

export default ManagePage;