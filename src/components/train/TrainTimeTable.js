import React from "react";

import { getCountdown } from "../../functions/function";
import {
  faSlash,
  faMapMarkerAlt,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TrainTimeTable = ({
  stationListView,
  trainTimeTable,
  color,
  station,
  time,
  language,
}) => {
  // if (trainTimeTable.length > 0) {
  // console.log(stationListView);
  //   console.log(trainTimeTable);
  // }
  return (
    <div className="container">
      <div className="container overflow-auto" style={{ height: "400px" }}>
        <table className="table">
          <thead>
            <tr key={0}>
              <th scope="col">{language === "en" ? "Min" : "分"}</th>
              <th scope="col">{language === "en" ? "Station" : "駅"}</th>
            </tr>
          </thead>
          <tbody>
            {stationListView.map((data, index) => {
              var departure_time = 0;
              trainTimeTable.forEach((element) => {
                if (
                  data["odpt:station"] ===
                  (element["odpt:departureStation"] ||
                    element["odpt:arrivalStation"])
                )
                  departure_time =
                    element["odpt:departureTime"] ||
                    element["odpt:arrivalTime"];
              });
              return departure_time !== 0 ? (
                <>
                  {getCountdown(time, departure_time) > 0 ? (
                    <tr key={index + 1}>
                      <td>
                        <div
                          style={{
                            border: "solid",
                            borderColor: color,
                            height: 35,
                            width: 35,
                            borderRadius: 5,
                          }}
                          className="position-relative"
                        >
                          <div className="position-absolute top-50 start-50 translate-middle">
                            {getCountdown(time, departure_time)}
                          </div>
                        </div>
                      </td>
                      <td className="fw-bold">
                        {station === data["odpt:station"] ? (
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{ color: "red" }}
                          />
                        ) : (
                          ""
                        )}
                        {data["odpt:stationTitle"][`${language}`]}
                      </td>
                    </tr>
                  ) : (
                    <tr key={index + 1}>
                      <td>
                        <div
                          style={{
                            border: "solid",
                            borderColor: color,
                            height: 35,
                            width: 35,
                            borderRadius: 5,
                          }}
                          className="position-relative"
                        >
                          <div className="position-absolute top-50 start-50 translate-middle">
                            <FontAwesomeIcon icon={faSlash} />
                          </div>
                        </div>
                      </td>
                      <td className="fw-lighter">
                        {data["odpt:stationTitle"][`${language}`]}
                      </td>
                    </tr>
                  )}
                </>
              ) : (
                <tr key={index + 1}>
                  <td>
                    <div
                      style={{
                        border: "solid",
                        borderColor: "grey",
                        height: 35,
                        width: 35,
                        borderRadius: 5,
                      }}
                      className="position-relative"
                    >
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                    </div>
                  </td>
                  <td className="text-decoration-line-through">
                    {data["odpt:stationTitle"][`${language}`]}
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
