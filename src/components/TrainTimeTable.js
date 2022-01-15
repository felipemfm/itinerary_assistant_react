import React from "react";

import { getName, getCountdown } from "../functions/function";

const TrainTimeTable = ({ trainTimeTable, color, station, time }) => {
  return (
    <div className="container">
      <p className="fs-6 fw-light text-center mt-3">
        Click on a specific train to see its itinerary
      </p>
      <ul className="list-inline">
        {trainTimeTable.map((data, index) => {
          var countdown = getCountdown(
            time,
            data["odpt:departureTime"] || data["odpt:arrivalTime"]
          );
          return (
            <span
              key={index}
              style={{
                backgroundColor: countdown > 0 ? color : "grey",
              }}
            >
              <li
                style={{ width: "200px" }}
                className="list-inline-item my-1 text-center roundedtext-wrap p-1"
              >
                {station ===
                (data["odpt:departureStation"] ||
                  data["odpt:arrivalStation"]) ? (
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ color: "black" }}
                  ></i>
                ) : (
                  ""
                )}
                {getName(
                  data["odpt:departureStation"] || data["odpt:arrivalStation"]
                )}
                <span className="fw-bold">
                  {countdown > 0 ? ` ${countdown}` : ""}
                </span>
              </li>
              <li className="list-inline-item">
                {index !== trainTimeTable.length - 1 ? (
                  <i className="bi bi-caret-right-fill"></i>
                ) : (
                  ""
                )}
              </li>
            </span>
          );
        })}
      </ul>
    </div>
  );
};

export default TrainTimeTable;
