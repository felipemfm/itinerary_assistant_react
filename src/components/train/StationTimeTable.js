import React from "react";

import { getName, getCountdown } from "../../functions/function";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StationTimeTable = ({
  list,
  operator,
  time,
  setTrainNumber,
  language,
}) => {
  return (
    <div className="container overflow-auto" style={{ height: "400px" }}>
      <table className="table table-hover">
        <thead className="sticky-top" style={{ backgroundColor: "white" }}>
          <tr key={0}>
            <th scope="col">{language === "en" ? "Time" : "時間"}</th>
            <th scope="col">{language === "en" ? "Min" : "分"}</th>
            <th scope="col">{language === "en" ? "Info" : "情報"}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {list.map((data, index) => {
            let countdown = getCountdown(time, data["odpt:departureTime"]);
            return countdown > 0 && Object.keys(data).length > 0 ? (
              <tr
                key={index + 1}
                onClick={
                  data["odpt:trainNumber"]
                    ? () => setTrainNumber(data["odpt:trainNumber"])
                    : null
                }                
              >
                <td>{data["odpt:departureTime"]}</td>
                <td className=" fw-bold">{countdown}</td>
                <td>
                  <span className="fw-bold">
                    {data["odpt:destinationStation"]
                      ? getName(data["odpt:destinationStation"][0])
                      : ""}
                  </span>
                  {" "}
                  {data["odpt:trainType"].replace(
                    `odpt.TrainType:${operator}.`,
                    ""
                  )}
                </td>
                {data["odpt:trainNumber"] ? (
                  <td>
                    <FontAwesomeIcon icon={faPlus} />
                  </td>
                ) : (
                  false
                )}
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
