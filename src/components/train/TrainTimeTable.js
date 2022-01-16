import React from "react";

import { getName, getCountdown } from "../../functions/function";
import {
  faAngleDoubleRight,
  faTimes,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrainTimeTable = ({ trainTimeTable, color, station, time }) => {
  return (
    <div className="container">
      <p className="fs-6 fw-light text-center mt-3">
        Click on a specific train to see its itinerary (availability may vary by company)
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
              className="p-1"
            >
              <li
                style={{ width: "200px" }}
                className="list-inline-item my-1 text-center p-1"
              >
                <p className="p-1 fw-bold">
                  {station ===
                  (data["odpt:departureStation"] ||
                    data["odpt:arrivalStation"]) ? (
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ color: "red" }}
                    />
                  ) : (
                    ""
                  )}
                  {getName(
                    data["odpt:departureStation"] || data["odpt:arrivalStation"]
                  )}
                </p>
                <span className="badge bg-dark">
                  {countdown > 0 ? (
                    `${countdown}`
                  ) : (
                    <FontAwesomeIcon icon={faTimes} />
                  )}
                </span>
              </li>
              <li className="list-inline-item">
                {index !== trainTimeTable.length - 1 ? (
                  <FontAwesomeIcon icon={faAngleDoubleRight} />
                ) : (
                  <FontAwesomeIcon icon={faTimes} />
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
