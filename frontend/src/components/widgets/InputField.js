import React from "react";

const InputField = ({ label, type, value, onChange, ...props}) => {
  return (
    <div>
      <h3>{label} </h3>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        {...props}
      />
    </div>
  );
};

export default InputField;