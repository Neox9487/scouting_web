import React from "react";

const Selections =  ({label, options, onChange, ...props}) => {
  return (
    <div>
      <h3>{label}</h3>
      <div className="selection-option" {...props}>
        {
          options.map(
            (option) => (
              <button className={option.value === props.value? "selected" : ""} key={option.value} type="button" onClick={() => onChange(option)}>
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