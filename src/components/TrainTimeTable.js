import React from "react";

import { getName } from "../functions/function";

const TrainTimeTable = ({ trainTimeTable, time }) => {
  return (
    <div className="container overflow-auto" style={{ width: "1080" }}>
      <p className="fs-6 fw-light text-center mt-3">
        Click on a specific train to see its itinerary
      </p>{" "}
      <ul className="list-inline">
        {trainTimeTable.map((data, index) => {
          return (data["odpt:departureTime"] || data["odpt:arrivalTime"]) >
            time ? (
            <>
              <li className="list-inline-item">
                <ul className="list-group list-group-flush" key={index}>
                  <li className="list-group-item">
                    {data["odpt:departureTime"] || data["odpt:arrivalTime"]}
                  </li>
                  <li className="list-group-item">
                    {getName(
                      data["odpt:departureStation"] ||
                        data["odpt:arrivalStation"]
                    )}
                  </li>
                </ul>
              </li>
              {index !== trainTimeTable.length - 1 ? (
                <li className="list-inline-item">
                  <i className="bi bi-arrow-right"></i>
                </li>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          );
        })}
      </ul>
    </div>
  );
};

export default TrainTimeTable;
