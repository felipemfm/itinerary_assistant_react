import React, { useState, useEffect } from "react";
import axios from "axios";

import OperatorSelect from "./train/OperatorSelect";
import LineSelect from "./train/LineSelect";
import OriginSelect from "./train/OriginSelect";
import TimeTable from "./train/TimeTable";
import TrainTimeTable from "./train/TrainTimeTable";

import { getName } from "../functions/function";

const apiKey = process.env.REACT_APP_API_KEY;

const Train = () => {
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const operatorList = [
    "JR-East",
    "TokyoMetro",
    "Toei",
    "Keio",
    "Keisei",
    "Keikyu",
    "Seibu",
    "TamaMonorail",
    "Tokyu",
    "TWR",
    "Yurikamome",
  ];
  const [operator, setOperator] = useState("");
  const [lineList, setLineList] = useState([]);
  const [line, setLine] = useState("");
  const [lineColor, setLineColor] = useState("");
  const [stationList, setStationList] = useState([]);
  const [originStation, setOriginStation] = useState("");
  const [ascending, setAscending] = useState("");
  const [ascendingList, setAscendingList] = useState([]);
  const [descending, setDescending] = useState("");
  const [descendingList, setDescendingList] = useState([]);
  const [trainNumber, setTrainNumber] = useState("");
  const [trainTimeTable, setTrainTimeTable] = useState([]);

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
    setLineList([]);
    setStationList([]);
    setAscendingList([]);
    setDescendingList([]);
    setAscending("");
    setDescending("");
    setTrainTimeTable([]);
  }, [operator]);

  useEffect(() => {
    setStationList([]);
    setAscendingList([]);
    setDescendingList([]);
    setTrainTimeTable([]);
  }, [line]);

  useEffect(() => {
    setAscendingList([]);
    setDescendingList([]);
    setTrainTimeTable([]);
  }, [originStation]);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${date.getHours()}:${("0" + date.getMinutes()).slice(-2)}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (operator !== "") {
      const getLine = async () => {
        const { data } = await axios.get(
          `https://api-tokyochallenge.odpt.org/api/v4/odpt:Railway?odpt:operator=odpt.Operator:${operator}&acl:consumerKey=${apiKey}`
        );
        // console.log(
        //   `https://api-tokyochallenge.odpt.org/api/v4/odpt:Railway?odpt:operator=odpt.Operator:${operator}&acl:consumerKey=${apiKey}`
        // );
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
        setLineColor(data[0]["odpt:color"]);
        setAscending(
          data[0]["odpt:ascendingRailDirection"]
            ? data[0]["odpt:ascendingRailDirection"].replace(
                "odpt.RailDirection:",
                ""
              )
            : "Ascending"
        );
        setDescending(
          data[0]["odpt:descendingRailDirection"]
            ? data[0]["odpt:descendingRailDirection"].replace(
                "odpt.RailDirection:",
                ""
              )
            : "Descending"
        );
        setStationList(data[0]["odpt:stationOrder"]);
      };
      getStation();
    }
  }, [line]);

  useEffect(() => {
    var name = originStation.replace("odpt.Station:", "");
    const getAscendingTimeTable = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.StationTimetable:${name}.${ascending}.${day}?acl:consumerKey=${apiKey}`
      );
      if (data.length > 0) {
        setAscendingList(data[0]["odpt:stationTimetableObject"]);
        // console.log(data);
      }
    };
    getAscendingTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originStation, ascending]);

  useEffect(() => {
    var name = originStation.replace("odpt.Station:", "");
    const getDescendingTimeTable = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.StationTimetable:${name}.${descending}.${day}?acl:consumerKey=${apiKey}`
      );
      if (data.length > 0) {
        setDescendingList(data[0]["odpt:stationTimetableObject"]);
        // console.log(data[0]["odpt:stationTimetableObject"]);
      }
    };
    getDescendingTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originStation, descending]);

  useEffect(() => {
    var name = line.replace("odpt.Railway:", "");
    const getTrainTimeTable = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.TrainTimetable:${name}.${trainNumber}.${day}?acl:consumerKey=${apiKey}`
      );
      if (data.length > 0) {
        // console.log(data[0]["odpt:trainTimetableObject"]);
        setTrainTimeTable(data[0]["odpt:trainTimetableObject"]);
      }
    };
    getTrainTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainNumber]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col mt-5">
          <p className="text-center fs-2">{time}</p>
          <OperatorSelect
            operatorList={operatorList}
            operator={operator}
            setOperator={setOperator}
          />
          <LineSelect lineList={lineList} line={line} setLine={setLine} />
          <OriginSelect
            stationList={stationList}
            originStation={originStation}
            setOriginStation={setOriginStation}
          />
        </div>
        <div className="col">
          <p className="fs-3">Direction: {getName(ascending)}</p>
          <TimeTable
            list={ascendingList}
            operator={operator}
            time={time}
            setTrainNumber={setTrainNumber}
          />
        </div>
        <div className="col">
          <p className="fs-3">Direction: {getName(descending)}</p>
          <TimeTable
            list={descendingList}
            operator={operator}
            time={time}
            setTrainNumber={setTrainNumber}
          />
        </div>
      </div>

      <div className="container">
        <TrainTimeTable
          trainTimeTable={trainTimeTable}
          color={lineColor}
          station={originStation}
          time={time}
        />
      </div>
    </div>
  );
};

export default Train;
