import React from "react";

const LineSelect = ({lineList, line, setLine}) => {
  return (
    <div className="form-group">
      <label className="form-label">Train Line</label>
      <select
        value={line}
        className="form-control form-select"
        onChange={(e) => setLine(e.target.value)}
      >
        <option key="0" defaultValue=""></option>
        {lineList.map((data, index) => {
          return data["odpt:stationOrder"].length > 1 ? (
            <option key={index + 1} value={data["owl:sameAs"]}>
              {data["odpt:railwayTitle"]["en"]}
            </option>
          ) : (
            ""
          );
        })}
      </select>
    </div>
  );
};

export default LineSelect;
