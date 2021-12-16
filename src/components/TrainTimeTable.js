import React from "react";

import { getName } from "../functions/function";

const TrainTimeTable = ({ trainTimeTable, color, station }) => {
  return (
    <div className="container">
      <p className="fs-6 fw-light text-center mt-3">
        Click on a specific train to see its itinerary
      </p>
      <ul className="list-inline">
        {trainTimeTable.map((data, index) => {
          return (
            <>
              <li
                className="list-inline-item rounded-pill p-1 my-1 text-center"
                style={{
                  border: "solid",
                  "border-color": color,
                  width: "200px",
                }}
              >
                {station ===
                (data["odpt:departureStation"] ||
                  data["odpt:arrivalStation"]) ? (
                  <i class="bi bi-geo-alt-fill" style={{ color: "red" }}></i>
                ) : (
                  ""
                )}
                {getName(
                  data["odpt:departureStation"] || data["odpt:arrivalStation"]
                )}
              </li>
              {index !== trainTimeTable.length - 1 ? (
                <li className="list-inline-item">
                  <i class="bi bi-forward-fill"></i>
                </li>
              ) : (
                ""
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default TrainTimeTable;
