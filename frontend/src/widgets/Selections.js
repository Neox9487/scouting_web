import React from "react";

const Selections =  ({label, selections, value, onChange, ...props}) => {
  return (
    <div style={{marginBottom:"10px"}}>
      <label>{label}</label>
      <div {...props}>
        {
          selections.map(
            (selection, index) => (
              <button key >
                {selection}
              </button>
            )
          )
        }
      </div>
    </div>
  )
};