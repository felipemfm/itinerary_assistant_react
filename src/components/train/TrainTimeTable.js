import React from "react";

import { getCountdown } from "../../functions/function";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrainTimeTable = ({
  stationListView,
  trainTimeTable,
  color,
  code,
  station,
  time,
  language,
}) => {
  return (
    <div className="container">
      <div className="container overflow-auto" style={{ height: "400px" }}>
        <table className="table">
          <thead>
            <tr key={0}>
              <th scope="col">{language === "en" ? "Code" : "コード"}</th>
              <th scope="col">{language === "en" ? "Station" : "駅"}</th>
            </tr>
          </thead>
          <tbody>
            {stationListView.map((data, index) => {
              return (
                <tr key={index + 1}>
                  <td>
                    <div
                      style={{
                        border: "solid",
                        borderColor:
                          trainTimeTable.length > 1
                            ? trainTimeTable[index]["time"] === false
                              ? "grey"
                              : color
                            : color,
                        height: 45,
                        width: 45,
                        borderRadius: 5,
                      }}
                      className="position-relative"
                    >
                      <div className="position-absolute top-50 start-50 translate-middle">
                        {code}
                        {data["index"]}
                      </div>
                    </div>
                  </td>
                  <td>
                    <ul className="list-unstyled">
                      <li className="fw-bold">
                        {station === data["station"] ? (
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{ color: "red" }}
                          />
                        ) : (
                          ""
                        )}
                        {data["title"][`${language}`]}
                      </li>
                      {trainTimeTable.length > 1 ? (
                        language === "en" ? (
                          <li>
                            {trainTimeTable[index]["time"] === false
                              ? "Not on the Itinerary"
                              : getCountdown(
                                  time,
                                  trainTimeTable[index]["time"]
                                ) > 0
                              ? `${
                                  index !== trainTimeTable.length - 1
                                    ? "Departing"
                                    : "Arriving"
                                } at ${
                                  trainTimeTable[index]["time"]
                                } (${getCountdown(
                                  time,
                                  trainTimeTable[index]["time"]
                                )} min)`
                              : `${
                                  index !== trainTimeTable.length - 1
                                    ? "Departed"
                                    : "Arrived"
                                } at ${trainTimeTable[index]["time"]}`}
                          </li>
                        ) : (
                          <li>
                            {trainTimeTable[index]["time"] === false
                              ? "路線外"
                              : getCountdown(
                                  time,
                                  trainTimeTable[index]["time"]
                                ) > 0
                              ? `${
                                  trainTimeTable[index]["time"]
                                }(${getCountdown(
                                  time,
                                  trainTimeTable[index]["time"]
                                )}分)に${
                                  index !== trainTimeTable.length - 1
                                    ? "出発"
                                    : "到着"
                                } `
                              : `${trainTimeTable[index]["time"]}${
                                  index !== trainTimeTable.length - 1
                                    ? "に出発しました"
                                    : "に到着しました"
                                }`}
                          </li>
                        )
                      ) : (
                        false
                      )}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainTimeTable;
