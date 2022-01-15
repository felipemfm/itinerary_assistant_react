import React from "react";

const OperatorSelect = ({ operatorList, operator, setOperator }) => {
  return (
    <div className="form-group">
      <label className="form-label">Line Operator</label>
      <select
        value={operator}
        className="form-control form-select"
        onChange={(e) => setOperator(e.target.value)}
      >
        <option key={0} defaultValue=""></option>
        {operatorList.map((element, index) => {
          return (
            <option key={index + 1} value={element}>
              {element}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OperatorSelect;
