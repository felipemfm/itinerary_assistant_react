import React from "react";

import { getName, getCountdown } from "../functions/function";

const TimeTable = ({ list, operator, time, setTrainNumber }) => {
  return (
    <div className="container overflow-auto" style={{ height: "400px" }}>
      <table className="table table-hover">
        <thead className="sticky-top" style={{ backgroundColor: "white" }}>
          <tr
          key={0}>
            <th scope="col">Time</th>
            <th scope="col">⏱</th>
            <th scope="col">Type</th>
            <th scope="col">Destination</th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => {
            let countdown = getCountdown(time, data["odpt:departureTime"]);
            // console.log(countdown);
            return countdown > 0 ? (
              <tr
                key={index+1}
                onClick={() => setTrainNumber(data["odpt:trainNumber"])}
              >
                <td>{data["odpt:departureTime"]}</td>
                <td className=" fw-bold">{countdown}</td>
                <td>
                  {data["odpt:trainType"].replace(
                    `odpt.TrainType:${operator}.`,
                    ""
                  )}
                </td>
                <td>{getName(data["odpt:destinationStation"][0])}</td>
              </tr>
            ) : (
              false
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
