import React, { useState, useEffect } from "react";

import InputField from "./InputField";
import Selections from "./Selections";
import TextField from "./TextField";
import Counter from "./Counter";

const BARGE_OPTIONS = [
  { label: "None",         value: "none" },
  { label: "Park",         value: "park" },
  { label: "Shallow Cage", value: "shallow_cage" },
  { label: "Deep Cage",    value: "deep_cage" },
];

const LEAVE_OPTIONS = [
  { label: "No",  value: false }, 
  { label: "Yes", value: true }, 
];

const DataForm = ({ onSubmit, initialValues = {} }) => {
  const[formData, setFormData] = useState({
    team_number: initialValues.team_number || "",
    match: initialValues.match || "",
    auto: {
      leave: initialValues.auto?.leave || false,
      coral_l1: initialValues.auto?.coral_l1 || 0,
      coral_l2: initialValues.auto?.coral_l2 || 0,
      coral_l3: initialValues.auto?.coral_l3 || 0,
      coral_l4: initialValues.auto?.coral_l4 || 0,
      processor: initialValues.auto?.processor || 0,
      net: initialValues.auto?.net || 0,
    },
    teleop: {
      coral_l1: initialValues.teleop?.coral_l1 || 0,
      coral_l2: initialValues.teleop?.coral_l2 || 0,
      coral_l3: initialValues.teleop?.coral_l3 || 0,
      coral_l4: initialValues.teleop?.coral_l4 || 0,
      processor: initialValues.teleop?.processor || 0,
      net: initialValues.teleop?.net || 0,
      barge: initialValues.teleop?.barge || "none",
    },
    note: initialValues.note || "",
  });

  useEffect(
    () => {
      setFormData({
        team: initialValues.team || "",
        match: initialValues.match || "",
        auto: {
          leave: initialValues.auto?.leave || false,
          coral_l1: initialValues.auto?.coral_l1 || 0,
          coral_l2: initialValues.auto?.coral_l2 || 0,
          coral_l3: initialValues.auto?.coral_l3 || 0,
          coral_l4: initialValues.auto?.coral_l4 || 0,
          processor: initialValues.auto?.processor || 0,
          net: initialValues.auto?.net || 0,
        },
        teleop: {
          coral_l1: initialValues.teleop?.coral_l1 || 0,
          coral_l2: initialValues.teleop?.coral_l2 || 0,
          coral_l3: initialValues.teleop?.coral_l3 || 0,
          coral_l4: initialValues.teleop?.coral_l4 || 0,
          processor: initialValues.teleop?.processor || 0,
          net: initialValues.teleop?.net || 0,
          barge: initialValues.teleop?.barge || "none",
        },
        note: initialValues.note || "",
      });
    }, [initialValues]
  )

  // Input change handler
  const handleInputChange = (section, field, value) => {
    setFormData(prevState => {
      if (section) { 
        return {
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: value,
          },
        };
      } else { 
        return {
          ...prevState,
          [field]: value,
        };
      }
    });
  }
  
  // Increment handler
  const handleIncrement = (section, field) => {
    setFormData(prevState => {
      const currentValue = prevState[section][field] || 0;
      if (section) {
        return {
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: currentValue++,
          }
        }
      }
      else {
        return {
          ...prevState[section],
          [field]: currentValue++,
        }
      }
    });
  }

  // Decrement handler
  const handleDecrement = (section, field) => {
    setFormData(prevState => {
      const currentValue = prevState[section][field] || 0;
      if (section) {
        return {
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: currentValue--,
          }
        }
      }
      else {
        return {
          ...prevState[section],
          [field]: currentValue > 0 ? currentValue-- : 0,
        }
      }
    });
  }

  // Handle counter input change
  const handleCounterInputChange = (section, field, value) => {
    const numValue = parseInt(value, 10);
    handleInputChange(section, field, isNaN(numValue) ? 0 : numValue);
  };

  return (
    <form>

      {/* Team Number and Match Number */}
      <h2>Scouting</h2>
      <div className="form-field">
        <InputField
          label="隊伍號碼" 
          type="number"
          value={formData.team}
          onChange={(e) => handleInputChange(null, "team_number", e.target.value)} 
          required 
          min="1"
        />
      </div>
      <div className="form-field">
        <InputField
          label="場次"
          type="number"
          value={formData.match}
           onChange={(e) => handleInputChange(null, "match", e.target.value)} 
          required 
          min="1"
        />
      </div>

      {/* Auto Phase */}
      <h3>Auto Phase</h3>
      {/* Leave */}
      <div className="selections-field">
        <Selections
          label="Leave"
          options={LEAVE_OPTIONS} 
          value={formData.auto.leave}
          onChange={(selectedValue) => handleInputChange("auto", "leave", selectedValue)}
        />
      </div>
      {/* Auto Coral*/}
      {["l1", "l2", "l3", "l4"].map(level => (
      <div key={`auto_${level}`} className="counter-field">
        <Counter
          label={`${level.toUpperCase()}`} 
          value={formData.auto[`coral_${level}`]}
          onChange={(e) => handleCounterInputChange("auto", `coral_${level}`, e.target.value)} 
          onIncrement={() => handleIncrement("auto", `coral_${level}`)} 
          onDecrement={() => handleDecrement("auto", `coral_${level}`)} 
        />
      </div>
      ))}
      {/* Auto Processor and Net*/}
      <div className="counter-field">
        <Counter
          label="Processor"
          value={formData.auto.processor}
          onChange={(e) => handleCounterInputChange("auto", "processor", e.target.value)}
          onIncrement={() => handleIncrement("auto", "processor")}
          onDecrement={() => handleDecrement("auto", "processor")}
        />
      </div>
      <div className="counter-field">
        <Counter
          label="Net"
          value={formData.auto.net}
          onChange={(e) => handleCounterInputChange("auto", "net", e.target.value)}
          onIncrement={() => handleIncrement("auto", "net")}
          onDecrement={() => handleDecrement("auto", "net")}
        />
      </div>

      {/* Teleop Phase */}
      <h3>Teleop Phase</h3>
      {/* Teleop Coral*/}
      {["l1", "l2", "l3", "l4"].map(level => (
      <div key={`teleop_${level}`} className="counter-field">
        <Counter
          label={`${level.toUpperCase()}`} 
          value={formData.teleop[`coral_${level}`]}
          onChange={(e) => handleCounterInputChange("teleop", `coral_${level}`, e.target.value)} 
          onIncrement={() => handleIncrement("teleop", `coral_${level}`)} 
          onDecrement={() => handleDecrement("teleop", `coral_${level}`)} 
        />
      </div>
      ))}
      {/* Teleop Processor and Net*/}
      <div className="counter-field">
        <Counter
          label="Processor"
          value={formData.teleop.processor}
          onChange={(e) => handleCounterInputChange("teleop", "processor", e.target.value)}
          onIncrement={() => handleIncrement("teleop", "processor")}
          onDecrement={() => handleDecrement("teleop", "processor")}
        />
      </div>
      <div className="counter-field">
        <Counter
          label="Net"
          value={formData.teleop.net}
          onChange={(e) => handleCounterInputChange("teleop", "net", e.target.value)}
          onIncrement={() => handleIncrement("teleop", "net")}
          onDecrement={() => handleDecrement("teleop", "net")}
        />
      </div>
      {/*Barge*/}
      <div className="selections-field">
        <Selections
          label="Barge"
          value={formData.teleop.barge}
          onChange={(selectedValue) => handleInputChange("teleop", "barge", selectedValue)}
          options={BARGE_OPTIONS} 
        />
      </div>

      {/* Note */}
      <div className="form-field"> 
        <TextField 
          label="備註" 
          value={formData.note}
          onChange={(e) => handleInputChange(null, 'note', e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        提交
      </button>
    </form>
  );
}

export default DataForm;