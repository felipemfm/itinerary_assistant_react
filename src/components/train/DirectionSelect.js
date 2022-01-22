import React from "react";
import { getName } from "../../functions/function";

const DirectionSelect = ({
  lineInfo,
  direction,
  setDirection,
  station,
  language,
}) => {
  var ascending_tile = "";
  var descending_title = "";
  if (lineInfo["ascending_tile"] || lineInfo["descending_title"]) {
    ascending_tile = lineInfo["ascending_title"][`${language}`];
    descending_title = lineInfo["descending_title"][`${language}`];
  }
  var stationName = "";
  if (station) {
    stationName = station.replace("odpt.Station:", "");
    stationName = getName(stationName);
  }
  const regex = /[!"#$%&'*+,-./:;()<=>?@[\]^_`{|}~]\s/g;
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
            lineInfo["ascending_tile"] &&
            stationName ===
              lineInfo["descending_title"]["en"].replace(regex, "")
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
            lineInfo["ascending_tile"] &&
            stationName ===
              lineInfo["ascending_tile"]["en"].replace(regex, "")
              ? true
              : false
          }
        >
          {ascending_tile}
        </option>
      </select>
    </div>
  );
};

export default DirectionSelect;
