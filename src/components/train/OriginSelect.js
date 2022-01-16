import React from "react";

const OriginSelect = ({ stationList, originStation, setOriginStation }) => {
  return (
    <div className="form-group">
      <label className="form-label">Origin Station</label>
      <select
        value={originStation}
        className="form-control form-select"
        onChange={(e) => setOriginStation(e.target.value)}
      >
        <option key={0} value="" defaultValue></option>
        {stationList.map((data) => {
          return (
            <option key={data["odpt:index"] + 1} value={data["odpt:station"]}>
              {data["odpt:stationTitle"]["en"]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OriginSelect;
