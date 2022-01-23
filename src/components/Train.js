import React, { useState, useEffect } from "react";
import axios from "axios";

import OperatorSelect from "./train/OperatorSelect";
import LineSelect from "./train/LineSelect";
import StationSelect from "./train/StationSelect";
import DirectionSelect from "./train/DirectionSelect";
import StationTimeTable from "./train/StationTimeTable";
import TrainTimeTable from "./train/TrainTimeTable";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apiKey = process.env.REACT_APP_API_KEY;

const lineProfile = {
  color: "",
  ascending: "",
  ascending_title: { en: "", ja: "" },
  descending: "",
  descending_title: { en: "", ja: "" },
  code: "",
  station_order: [{ index: "", station: "", title: { en: "", ja: "" } }],
};
const trainProfile = [{ station: "", time: false }];
const Train = ({ language, time }) => {
  const [day, setDay] = useState("");
  const [operator, setOperator] = useState("");
  const [lineList, setLineList] = useState([]);
  const [line, setLine] = useState("");
  const [lineInfo, setLineInfo] = useState(lineProfile);
  const [station, setStation] = useState("");
  const [direction, setDirection] = useState("");
  const [stationTimeTable, setStationTimeTable] = useState([]);
  const [trainNumber, setTrainNumber] = useState(false);
  const [trainTimeTable, setTrainTimeTable] = useState(trainProfile);

  useEffect(() => {
    const date = new Date();
    const getDate = async () => {
      const { data } = await axios.get(
        "https://holidays-jp.github.io/api/v1/date.json"
      );
      date.getDay() + 1 === 1 || date.getDay() + 1 === 7 //Check if today is Sunday or Saturday
        ? setDay("SaturdayHoliday")
        : data[`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`] //Get today's date on YYYY-MM-DD format
        ? setDay("SaturdayHoliday")
        : setDay("Weekday");
    };
    getDate();
  });

  useEffect(() => {
    setDirection("");
    setLineList([]);
    setTrainTimeTable([]);
    setTrainNumber(false);
    setLineInfo(lineProfile);
    setStationTimeTable([]);
    setTrainTimeTable(trainProfile);
  }, [operator]);

  useEffect(() => {
    setDirection("");
    setTrainTimeTable([]);
    setTrainNumber(false);
    setLineInfo(lineProfile);
    setStationTimeTable([]);
    setTrainTimeTable(trainProfile);
  }, [line]);

  useEffect(() => {
    setDirection("");
    setTrainNumber(false);
    setStationTimeTable([]);
    setTrainTimeTable(trainProfile);
  }, [station]);

  useEffect(() => {
    setTrainNumber(false);
    setTrainTimeTable(trainProfile);
  }, [direction]);

  useEffect(() => {
    if (operator !== "") {
      const getLine = async () => {
        const { data } = await axios.get(
          `https://api-tokyochallenge.odpt.org/api/v4/odpt:Railway?odpt:operator=odpt.Operator:${operator}&acl:consumerKey=${apiKey}`
        );
        // console.log(data);
        setLineList(data);
      };
      getLine();
    }
  }, [operator]);

  useEffect(() => {
    if (line !== "") {
      const getStation = async () => {
        const { data } = await axios.get(
          `https://api-tokyochallenge.odpt.org/api/v4/datapoints/${line}?acl:consumerKey=${apiKey}`
        );
        // console.log(data);
        var ascending = data[0]["odpt:ascendingRailDirection"]
          ? data[0]["odpt:ascendingRailDirection"].replace(
              "odpt.RailDirection:",
              ""
            )
          : "Ascending";
        var descending = data[0]["odpt:descendingRailDirection"]
          ? data[0]["odpt:descendingRailDirection"].replace(
              "odpt.RailDirection:",
              ""
            )
          : "Descending";

        var stationOrder = [];
        data[0]["odpt:stationOrder"].forEach((element) => {
          const aux = {
            index: element["odpt:index"],
            station: element["odpt:station"],
            title: element["odpt:stationTitle"],
          };
          stationOrder = [...stationOrder, aux];
        });

        setLineInfo({
          color: data[0]["odpt:color"],
          code: data[0]["odpt:lineCode"],
          ascending: ascending,
          ascending_title:
            data[0]["odpt:stationOrder"][
              data[0]["odpt:stationOrder"].length - 1
            ]["odpt:stationTitle"],
          descending: descending,
          descending_title:
            data[0]["odpt:stationOrder"][0]["odpt:stationTitle"],
          station_order: stationOrder,
        });
      };
      getStation();
    }
  }, [line]);

  useEffect(() => {
    var name = station.replace("odpt.Station:", "");
    const getStationTimeTable = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.StationTimetable:${name}.${direction}.${day}?acl:consumerKey=${apiKey}`
      );
      if (data.length > 0) {
        setStationTimeTable(data[0]["odpt:stationTimetableObject"]);
      }
    };
    getStationTimeTable();
  }, [day, direction, station]);

  useEffect(() => {
    var name = line.replace("odpt.Railway:", "");
    const getTrainTimeTable = async () => {
      const { data } = await axios
        .get(
          `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.TrainTimetable:${name}.${trainNumber}.${day}?acl:consumerKey=${apiKey}`
        )
        .catch((error) => console.log(error));
      // console.log(data);
      if (data.length > 0) {
        var train_time_table = [],
          i = 0,
          line_info_copy =
            lineInfo["ascending"] === direction
              ? [...lineInfo["station_order"]]
              : [...lineInfo["station_order"]].reverse();
        line_info_copy.forEach((element) => {
          var time = false;
          if (
            data[0]["odpt:trainTimetableObject"][i] &&
            element["station"] ===
              (data[0]["odpt:trainTimetableObject"][i][
                "odpt:departureStation"
              ] ||
                data[0]["odpt:trainTimetableObject"][i]["odpt:arrivalStation"])
          ) {
            time =
              data[0]["odpt:trainTimetableObject"][i]["odpt:departureTime"] ||
              data[0]["odpt:trainTimetableObject"][i]["odpt:arrivalTime"];
            i++;
          }
          train_time_table.push({
            station: element["station"],
            time: time,
          });
        });
        setTrainTimeTable(train_time_table);
      }
    };
    getTrainTimeTable();
  }, [day, direction, line, lineInfo, trainNumber]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 mt-5">
          <OperatorSelect
            operator={operator}
            setOperator={setOperator}
            language={language}
          />
          <LineSelect
            lineList={lineList}
            line={line}
            setLine={setLine}
            language={language}
          />
          <StationSelect
            stationOrder={lineInfo["station_order"]}
            station={station}
            setStation={setStation}
            language={language}
          />
          <DirectionSelect
            lineInfo={lineInfo}
            direction={direction}
            setDirection={setDirection}
            station={station}
            language={language}
          />
        </div>
        <div className="col-4">
          <p className="fs-3">{language === "en" ? "Schedule" : "ダイヤ"}</p>
          {operator && line && station && direction ? (
            <StationTimeTable
              list={stationTimeTable}
              operator={operator}
              time={time}
              setTrainNumber={setTrainNumber}
              language={language}
            />
          ) : (
            false
          )}
        </div>
        <div className="col-5">
          <p className="fs-3">
            {language === "en" ? "Train Itinerary" : "経路"}
          </p>
          {operator && line && station && direction ? (
            <TrainTimeTable
              stationListView={
                lineInfo["ascending"] === direction
                  ? [...lineInfo["station_order"]]
                  : [...lineInfo["station_order"]].reverse()
              }
              trainTimeTable={trainTimeTable}
              color={lineInfo["color"]}
              code={lineInfo["code"]}
              station={station}
              time={time}
              language={language}
            />
          ) : (
            false
          )}
        </div>
      </div>

      {language === "en" ? (
        <div className="text-center py-5">
          Schedule entries with a <FontAwesomeIcon icon={faPlus} /> will have
          additional information displayed if clicked.
        </div>
      ) : (
        <div className="text-center py-5">
          <FontAwesomeIcon icon={faPlus} />{" "}
          付いたスケジュール項目は、クリックすると追加情報が表示されます。
        </div>
      )}

    </div>
  );
};

export default Train;
