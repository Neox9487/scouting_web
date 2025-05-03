import React  from "react";

const Counter = ({ lable, value, onChange, onIncrement, onDecrement , ...props}) => {
  return (
    <div style={{marginBottom: "10px"}}>
      <lable>{lable}</lable>
      <div {...props}>
        <button onClick={onIncrement} type="button">Increment</button>
        <input
          type="number" 
          value={value} 
          onChange={onChange} 
        />
        <button onClick={onDecrement} type="button">Decrement</button>
      </div>
    </div>
  );
};

export default Counter; 