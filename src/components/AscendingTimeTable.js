import React from "react";

import { getName, getCountdown } from "../functions/function";

const AscendingTimeTable = ({
  ascendingList,
  operator,
  time,
  setTrainNumber,
}) => {
  return (
    <div className="container overflow-auto" style={{ height: "400px" }}>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">⏱</th>
            <th scope="col">Type</th>
            <th scope="col">Destination</th>
          </tr>
        </thead>
        <tbody>
          {ascendingList.map((data, index) => {
            return data["odpt:departureTime"] > time ? (
              <tr
                key={index}
                onClick={() => setTrainNumber(data["odpt:trainNumber"])}
              >
                <td>{data["odpt:departureTime"]}</td>
                <td className=" fw-bold">
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
    </div>
  );
};

export default AscendingTimeTable;
