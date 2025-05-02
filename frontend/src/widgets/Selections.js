import React from "react";

const Selections =  ({label, options, value, onChange, ...props}) => {
  return (
    <div style={{marginBottom:"10px"}}>
      <label>{label} </label>
      {
        options.map(
          (option) => (
            <button 
              key={option.value} 
              type="button"
              onClick={() => onChange(option)}
              className={value === option.value ? 'active' : ''}
              {...props}
            >
              {option.label}
            </button>
          )
        )
      }
    </div>
  )
};

export default Selections;