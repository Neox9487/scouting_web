import React, { useState, useEffect } from "react";

import InputField from "./widgets/InputField";
import Selections from "./widgets/Selections";
import TextField from "./widgets/TextField";
import Counter from "./widgets/Counter";

const INITIAL_FORM = {
  team_number: 0,
  match: 0,
  auto: {
    leave: false,
    coral_l1: 0,
    coral_l2: 0,
    coral_l3: 0,
    coral_l4: 0,
    processor: 0,
    net: 0,
  },
  teleop: {
    coral_l1: 0,
    coral_l2: 0,
    coral_l3: 0,
    coral_l4: 0,
    processor: 0,
    net: 0,
    barge: "none",
  },
  note: "",
};

const BARGE_OPTIONS = [
  { label: "No barge",     value: "none" },
  { label: "Park",         value: "park" },
  { label: "Shallow Cage", value: "shallow_cage" },
  { label: "Deep Cage",    value: "deep_cage" },
];

const LEAVE_OPTIONS = [
  { label: "No",  value: false }, 
  { label: "Yes", value: true }, 
];

const DataForm = ({ onSubmit, initialData}) => {
  const[formData, setFormData] = useState({
    team_number: 0,
    match: 0,
    auto: {
      leave: false,
      coral_l1: 0,
      coral_l2: 0,
      coral_l3: 0,
      coral_l4: 0,
      processor: 0,
      net: 0,
    },
    teleop: {
      coral_l1: 0,
      coral_l2: 0,
      coral_l3: 0,
      coral_l4: 0,
      processor: 0,
      net: 0,
      barge: "none",
    },
    note: "",
  });

  useEffect(
    () => {
      setFormData( initialData || INITIAL_FORM);
    }, [initialData]
  )

  const handleInputChange = (section, field, value) => {
    if (["team_number", "match"].includes(field)) {
      value = parseInt(value, 10) || 0;
    }
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
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: currentValue+1,
        }
      }
    });
  }

  // Decrement handler
  const handleDecrement = (section, field) => {
    setFormData(prevState => {
      const currentValue = prevState[section][field] || 0;
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: currentValue > 0 ? currentValue-1 : 0,
        }
      }
    });
  }

  // Handle counter input change
  const handleCounterInputChange = (section, field, value) => {
    const numValue = parseInt(value, 10);
    handleInputChange(section, field, isNaN(numValue) ? 0 : numValue);
  };

  // Handle subission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Team Number and Match Number */}
      <div className="section-box">
        <div className="form-field">
          <InputField
            label="Team Number" 
            type="number"
            value={formData.team_number}
            onChange={(e) => handleInputChange(null, "team_number", e.target.value)} 
            required 
            min="1"
          />
        </div>
        <div className="form-field">
          <InputField
            label="Match"
            type="number"
            value={formData.match}
            onChange={(e) => handleInputChange(null, "match", e.target.value)} 
            required 
            min="1"
          />
        </div>
      </div>

      {/* Auto Phase */}
      <h2>Auto Phase</h2>
      {/* Leave */}
      <div className="section-box">
        <div className="selections-field">
          <Selections
            label={"Leave"}
            className="leave"
            options={LEAVE_OPTIONS} 
            value={formData.auto.leave}
            onChange={(selectedValue) => handleInputChange("auto", "leave", selectedValue === true || selectedValue === "true" ? true : false)}
          />
        </div>
      </div>
        
      {/* Auto Coral*/}
      <div className="section-box">
        {["l1", "l2", "l3", "l4"].map(level => (
          <div key={`auto_${level}`} className="counter-field">
            <h3>{level.toUpperCase()}</h3>
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
          <h3>Processor</h3>
          <Counter
            className="processor"
            label="Processor"
            value={formData.auto.processor}
            onChange={(e) => handleCounterInputChange("auto", "processor", e.target.value)}
            onIncrement={() => handleIncrement("auto", "processor")}
            onDecrement={() => handleDecrement("auto", "processor")}
          />
        </div>
        <div className="counter-field">
          <h3>Net</h3>
          <Counter
            className="net"
            label="Net"
            value={formData.auto.net}
            onChange={(e) => handleCounterInputChange("auto", "net", e.target.value)}
            onIncrement={() => handleIncrement("auto", "net")}
            onDecrement={() => handleDecrement("auto", "net")}
          />
        </div>
      </div>

      {/* Teleop Phase */}
      <h2>Teleop Phase</h2>
      {/* Teleop Coral*/}
      <div className="section-box">
        {["l1", "l2", "l3", "l4"].map(level => (
          <div key={`teleop_${level}`} className="counter-field">
            <h3>{level.toUpperCase()}</h3>
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
          <h3>Processor</h3>
          <Counter
            className="processor"
            label="Processor"
            value={formData.teleop.processor}
            onChange={(e) => handleCounterInputChange("teleop", "processor", e.target.value)}
            onIncrement={() => handleIncrement("teleop", "processor")}
            onDecrement={() => handleDecrement("teleop", "processor")}
          />
        </div>
        <div className="counter-field">
          <h3>Net</h3>
          <Counter
            className="net"
            label="Net"
            value={formData.teleop.net}
            onChange={(e) => handleCounterInputChange("teleop", "net", e.target.value)}
            onIncrement={() => handleIncrement("teleop", "net")}
            onDecrement={() => handleDecrement("teleop", "net")}
          />
        </div>
      </div>
      {/*Barge*/}
      <div className="section-box">
        <div className="selections-field">
          <Selections
            className="barge"
            value={formData.teleop.barge}
            onChange={(selectedOption) => handleInputChange("teleop", "barge", selectedOption.value)}
            options={BARGE_OPTIONS} 
          />
        </div>
      </div>
      {/* Note */}
      <div className="form-field"> 
        <TextField 
          label={null}
          value={formData.note}
          onChange={(e) => handleInputChange(null, 'note', e.target.value)}
          placeholder="Notes"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-button">
        上傳
      </button>
    </form>
  );
}

export default DataForm;