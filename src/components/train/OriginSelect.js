import React from "react";

const OriginSelect = ({ stationList, originStation, setOriginStation, language }) => {
  return (
    <div className="form-group">
      <label className="form-label">{language === "en" ? "Station of Origin" : "発車駅"}</label>
      <select
        value={originStation}
        className="form-control form-select"
        onChange={(e) => setOriginStation(e.target.value)}
      >
        <option key={0} value="" defaultValue></option>
        {stationList.map((data) => {
          return (
            <option key={data["odpt:index"] + 1} value={data["odpt:station"]}>
              {data["odpt:stationTitle"][`${language}`]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OriginSelect;
