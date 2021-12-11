import React from "react";

import { getName, getCountdown } from "../functions/function";

const DescendingTimeTable = ({ descendingList, operator, time }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Departure</th>
          <th scope="col">⏱</th>
          <th scope="col">Type</th>
          <th scope="col">Destination</th>
        </tr>
      </thead>
      <tbody>
        {descendingList.map((data, index) => {
          return data["odpt:departureTime"] > time ? (
            <tr key={index}>
              <td>{data["odpt:departureTime"]}</td>
              <td className="fw-bold">
                {getCountdown(time, data["odpt:departureTime"])}
              </td>
              <td>
                {data["odpt:trainType"].replace(
                  `odpt.TrainType:${operator}.`,
                  ""
                )}
              </td>
              <td>{getName(data["odpt:destinationStation"][0])}</td>
            </tr>
          ) : (
            ""
          );
        })}
      </tbody>
    </table>
  );
};

export default DescendingTimeTable;
