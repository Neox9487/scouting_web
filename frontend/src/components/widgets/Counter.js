import React  from "react";

const Counter = ({ lable, value, onChange, onIncrement, onDecrement , ...props}) => {
  return (
    <div style={{marginBottom: "10px"}}>
      <label>{lable}</label>
      <div {...props}>
        <button onClick={onIncrement} type="button">Increment</button>
        <span>
            {value}
        </span>
        <button onClick={onDecrement} type="button">Decrement</button>
      </div>
    </div>
  );
};

export default Counter; 