import React from "react";

import { getName } from "../functions/function";

const TrainTimeTable = ({ trainTimeTable, time }) => {
  return (
    <div>
      <h3>Train Time Table</h3>
      <h5>
        Click on a specific train on the time table to access its itinerary
      </h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Destination</th>
          </tr>
        </thead>
        <tbody>
          {trainTimeTable.map((data, index) => {
            return data["odpt:departureTime"] > time ? (
              <tr key={index}>
                <td>{data["odpt:departureTime"]}</td>
                <td>{getName(data["odpt:departureStation"])}</td>
              </tr>
            ) : (
              ""
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TrainTimeTable;
