import React from "react";

import { getName } from "../functions/function";

const TrainTimeTable = ({ trainTimeTable, color, station }) => {
  return (
    <div className="container">
      <p className="fs-6 fw-light text-center mt-3">
        Click on a specific train to see its itinerary
      </p>
      <ul className="list-inline">
        <li
          style={{ "background-color": color }}
          className="list-inline-item my-1 text-center"
        >
          {trainTimeTable.map((data, index) => {
            return (
              <>
                {station ===
                (data["odpt:departureStation"] ||
                  data["odpt:arrivalStation"]) ? (
                  <i class="bi bi-geo-alt-fill" style={{ color: "black" }}></i>
                ) : (
                  ""
                )}
                {getName(
                  data["odpt:departureStation"] || data["odpt:arrivalStation"]
                )}
                {index !== trainTimeTable.length - 1 ? (
                  <i class="bi bi-forward-fill"></i>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default TrainTimeTable;
