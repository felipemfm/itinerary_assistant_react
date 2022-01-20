import React from "react";

const DirectionSelect = ({ lineInfo, direction, setDirection, language }) => {
  var ascending_tile = "";
  var descending_title = "";
  if (lineInfo[0]["ascending_tile"] || lineInfo[0]["descending_title"]) {
    ascending_tile = lineInfo[0]["ascending_tile"][`${language}`];
    descending_title = lineInfo[0]["descending_title"][`${language}`];
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
        <option key={1} value={lineInfo[0]["ascending"]}>
          {ascending_tile}
        </option>
        <option key={2} value={lineInfo[0]["descending"]}>
          {descending_title}
        </option>
      </select>
    </div>
  );
};

export default DirectionSelect;
