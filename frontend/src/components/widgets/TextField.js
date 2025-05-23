import React from "react";

const TextField = ({ label, value, onChange, ...props }) => {
  return (
    <div> 
      <h3>{label} </h3>
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