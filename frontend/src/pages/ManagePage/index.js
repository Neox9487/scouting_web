import React, {useState, useEffect} from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [sortType, setSortType] = useState("team_number");

  useEffect(() => {
    fetchData()
      .then((data) => {
        const sortedData = [...data.data].sort((a, b) => {
          return a.match - b.match;
        })
        setData(sortedData);
        setIsLoading(false);
        setMessage(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage("Error fetching data: error"+error);
        setIsError(true);
      });
  }, []);

  const sortData = (type) => {
    const sortedData = [...data].sort((a, b) => {
      if (type === "team_number") {
        return a.team_number - b.team_number;
      } else if (type === "match") {
        return a.match - b.match;
      } else if (type === "auto") {
        return (b.auto.leave*4 +b.auto.coral_l1*3 + b.auto.coral_l2*4 + b.auto.coral_l3*6 + b.auto.coral_l4*6 + b.auto.processor*6 + b.auto.net*4) - 
               (a.auto.leave*4 +a.auto.coral_l1*3 + a.auto.coral_l2*4 + a.auto.coral_l3*6 + a.auto.coral_l4*6 + a.auto.processor*6 + a.auto.net*4);
      } else if (type === "teleop") {
        // teleop score
        let a_score = b.teleop.coral_l1*3 + b.teleop.coral_l2*4 + b.teleop.coral_l3*6 + b.teleop.coral_l4*6 + b.teleop.processor*6 + b.teleop.net*4;
        let b_score = a.teleop.coral_l1*3 + a.teleop.coral_l2*4 + a.teleop.coral_l3*6 + a.teleop.coral_l4*6 + a.teleop.processor*6 + a.teleop.net*4;

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
          b_score += 0;
        } else if (b.teleop.barge === "park") {
          b_score += 2;
        } else if (b.teleop.barge === "shallow_cage") {
          b_score += 6;
        } else if (b.teleop.barge === "deep_cage") {
          b_score += 12;
        }
        return a_score - b_score;
      } else if (type === "processor") {
        return (b.auto.processor + b.teleop.processor) - (a.auto.processor + a.teleop.processor);
      } else if (type === "net") {
        return (b.auto.net + b.teleop.net) - (a.auto.net + a.teleop.net);
      } else if (type === "L4") {
        return (b.auto.coral_l4 + b.teleop.coral_l4) - (a.auto.coral_l4 + a.teleop.coral_l4);
      } else if (type === "L3") {
        return (b.auto.coral_l3 + b.teleop.coral_l3) - (a.auto.coral_l3 + a.teleop.coral_l3);
      } else if (type === "L2") {
        return (b.auto.coral_l2 + b.teleop.coral_l2) - (a.auto.coral_l2 + a.teleop.coral_l2);
      } else if (type === "L1") {
        return (b.auto.coral_l1 + b.teleop.coral_l1) - (a.auto.coral_l1 + a.teleop.coral_l1);
      } else {
        return a.match - b.match;
      }
    })
    setData(sortedData);
  }

  const getTeleopScore = (teleop) => {
    let score = teleop.coral_l1 * 3 + teleop.coral_l2 * 4 + teleop.coral_l3 * 6 + teleop.coral_l4 * 6 + teleop.processor * 6 + teleop.net * 4;
    if (teleop.barge === "park") score += 2;
    else if (teleop.barge === "shallow_cage") score += 6;
    else if (teleop.barge === "deep_cage") score += 12;
    return score;
  };

  const refresh = () => {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        const sortedData = [...data.data].sort((a, b) => {
          return a.match - b.match;
        })
        setData(sortedData);
        setIsLoading(false);
        setMessage(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setMessage("Error refreshing data: "+error);
        setIsError(true);
      });
  };

  const handleUpdate = (updatedData) => {
    updateData(updatedData)
      .then(() => {
        refresh();
        setMessage("Data updated successfully");
        setIsError(false);
      })
      .catch((error) => {
        setMessage("Error updating data: "+ error);
        setIsError(true);
      });
  };

  const handleDelete = (teamNumber, match) => {
    if (!window.confirm(`Delete team ${teamNumber} match ${match}?`)) return;
    deleteData(teamNumber, match)
      .then(() => {
        setData(data.filter((item) => item.team_number !== teamNumber || item.match !== match));
        setMessage("Data deleted successfully");
        setIsError(false);
        setEditing(null)
      })
      .catch((error) => {
        setMessage("Error deleting data: "+error);
        setIsError(true);
    });
  };

  return (
    <div className="manage-page">
      <div className={`data-table-${isLoading ? "loading" : ""}`}>
        {/* Sort buttons */}
        <div className="section-box">
          <button onClick={refresh}>Refresh</button>
        </div>    
        {/* Data table */}
        <div className="section-box">
          <div className="sort-type-select">
            <select
              value={sortType}
              onChange={(e) => {
                const selected = e.target.value;
                setSortType(selected);
                sortData(selected);
              }}
            >
              {SortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>TeamNumber</th>
                <th>Match</th>
                <th>AutoScore</th>
                <th>TeleopScore</th>
                <th>Processor</th>
                <th>Net</th>
                <th>L4</th>
                <th>L3</th>
                <th>L2</th>
                <th>L1</th>
                <th>Barge</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={`${item.team_number}-${item.match}`}>
                  <td>{item.team_number}</td>
                  <td>{item.match}</td>
                  <td>{(item.auto.leave*4 +item.auto.coral_l1*3 + item.auto.coral_l2*4 + item.auto.coral_l3*6 + item.auto.coral_l4*6 + item.auto.processor*6 + item.auto.net*4)}</td>
                  <td>{getTeleopScore(item.teleop)}</td>
                  <td>{item.auto.processor + item.teleop.processor}</td>
                  <td>{item.auto.net + item.teleop.net}</td>
                  <td>{item.auto.coral_l4 + item.teleop.coral_l4}</td>
                  <td>{item.auto.coral_l3 + item.teleop.coral_l3}</td>
                  <td>{item.auto.coral_l2 + item.teleop.coral_l2}</td>
                  <td>{item.auto.coral_l1 + item.teleop.coral_l1}</td>
                  <td>{item.teleop.barge}</td>
                  <td>
                    <button onClick={() => setEditing(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.team_number, item.match)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* edit form*/}
      {editing && (
        <div className="edit-form">
          <h3>Edit Data</h3>
          <DataForm
            initialData={editing}
            onSubmit={(updatedData) => {
              handleUpdate(updatedData);
              setEditing(null); 
            }}
          />
          <button onClick={() => setEditing(null)}>Cancel</button>
        </div>
      )}
      {isError && <p className="error">{message}</p>}
      {isLoading && <p className="loading">Loading...</p>}
      {!isError && !isLoading && data.length === 0 && <p className="error">No data found! You can go to scouting page to add data.</p>}
    </div>
  )
}

export default ManagePage;