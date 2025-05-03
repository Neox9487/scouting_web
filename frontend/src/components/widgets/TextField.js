import React from "react";

const TextField = ({ label, value, onChange, ...props }) => {
  return (
    <div style={{marginBottom: "10px"}}> 
      <label>{label} </label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        rows={4} 
        {...props}
      />
    </div>
  )
}

export default TextField;