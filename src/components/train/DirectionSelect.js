import React from "react";
import { getName } from "../../functions/function";

const DirectionSelect = ({
  lineInfo,
  direction,
  setDirection,
  station,
  language,
}) => {
  var ascending_title = "";
  var descending_title = "";
  if (lineInfo["ascending_tile"] || lineInfo["descending_title"]) {
    ascending_title = lineInfo["ascending_title"][`${language}`];
    descending_title = lineInfo["descending_title"][`${language}`];
  }
  var stationName = "";
  if (station) {
    stationName = station.replace("odpt.Station:", "");
    stationName = getName(stationName)
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "")
      .toLowerCase();
  }
  return (
    <div className="form-group">
      <label className="form-label">
        {language === "en" ? "Direction" : "行き先"}
      </label>
      <select
        value={direction}
        className="form-control form-select"
        onChange={(e) => setDirection(e.target.value)}
      >
        <option key={0} defaultValue=""></option>
        <option
          key={2}
          value={lineInfo["descending"]}
          disabled={
            lineInfo["descending_title"] &&
            stationName ===
              lineInfo["descending_title"]["en"]
                .normalize("NFD")
                .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "")
                .toLowerCase()
              ? true
              : false
          }
        >
          {descending_title}
        </option>
        <option
          key={1}
          value={lineInfo["ascending"]}
          disabled={
            lineInfo["ascending_title"] &&
            stationName ===
              lineInfo["ascending_title"]["en"]
                .normalize("NFD")
                .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, "")
                .toLowerCase()
              ? true
              : false
          }
        >
          {ascending_title}
        </option>
      </select>
    </div>
  );
};

export default DirectionSelect;
