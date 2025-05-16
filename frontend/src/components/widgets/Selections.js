import React from "react";

const Selections =  ({label, options, onChange, ...props}) => {
  return (
    <div style={{marginBottom:"10px"}}>
      <h3>{label}</h3>
      <div className="selection-options" {...props}>
        {
          options.map(
            (option) => (
              <button className={option.value === props.value?.value ? "selected" : ""} key={option.value} type="button" onClick={() => onChange(option)}>
                {option.label}
              </button>
            )
          )
        }
      </div>
    </div>
  )
};

export default Selections;