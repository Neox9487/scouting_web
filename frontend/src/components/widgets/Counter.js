import React  from "react";

const Counter = ({ lable, value, onChange, onIncrement, onDecrement , ...props}) => {
  return (
    <div style={{marginBottom: "10px"}}>
      <h3>{lable}</h3>
      <div {...props}>
        <button onClick={onIncrement} type="button">＋</button>
        <span className="counter-value">
            {value}
        </span>
        <button onClick={onDecrement} type="button">－</button>
      </div>
    </div>
  );
};

export default Counter; 