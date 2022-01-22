import React from "react";

const StationSelect = ({ stationOrder, station, setStation, language }) => {
  return (
    <div className="form-group">
      <label className="form-label">{language === "en" ? "Station of Origin" : "発車駅"}</label>
      <select
        value={station}
        className="form-control form-select"
        onChange={(e) => setStation(e.target.value)}
      >
        <option key={0} value="" defaultValue></option>
        {stationOrder.map((data, index) => {
          return (
            <option key={index + 1} value={data["station"]}>
              {data["title"][`${language}`]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default StationSelect;
