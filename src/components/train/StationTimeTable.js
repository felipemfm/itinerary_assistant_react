import React from "react";

import { getName, getCountdown } from "../../functions/function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const StationTimeTable = ({ list, operator, time, setTrainNumber, language}) => {
  return (
    <div className="container overflow-auto" style={{ height: "400px" }}>
      <table className="table table-hover">
        <thead className="sticky-top" style={{ backgroundColor: "white" }}>
          <tr
          key={0}>
            <th scope="col">{language === "en" ? "Time" : "時間"}</th>
            <th scope="col">{language === "en" ? "Min" : "分"}</th>
            <th scope="col">{language === "en" ? "Destination" : "行き先"}</th>
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
                <td><span className="fw-bold">{getName(data["odpt:destinationStation"][0])}</span> {data["odpt:trainType"].replace(
                    `odpt.TrainType:${operator}.`,
                    ""
                  )}</td>
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

export default StationTimeTable;
