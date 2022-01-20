import React, { useState, useEffect } from "react";
import axios from "axios";

import OperatorSelect from "./train/OperatorSelect";
import LineSelect from "./train/LineSelect";
import OriginSelect from "./train/OriginSelect";
import DirectionSelect from "./train/DirectionSelect";
import StationTimeTable from "./train/StationTimeTable";
import TrainTimeTable from "./train/TrainTimeTable";

const apiKey = process.env.REACT_APP_API_KEY;

const Train = ({ language }) => {
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
  const [lineInfo, setLineInfo] = useState([0]);
  const [stationList, setStationList] = useState([]);
  const [stationListView, setStationListView] = useState([]);
  const [originStation, setOriginStation] = useState("");
  const [direction, setDirection] = useState("");
  const [stationTimeTable, setStationTimeTable] = useState([]);
  const [trainNumber, setTrainNumber] = useState("");
  const [trainTimeTable, setTrainTimeTable] = useState([0]);

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
    setLineInfo([0]);
    setDirection("");
    setLineList([]);
    setStationList([]);
    setStationTimeTable([]);
    setTrainTimeTable([]);
    setTrainNumber("");
    setTrainTimeTable([0]);
    setStationListView([]);
  }, [operator]);

  useEffect(() => {
    setLineInfo([0]);
    setDirection("");
    setStationList([]);
    setStationTimeTable([]);
    setTrainTimeTable([]);
    setTrainNumber("");
    setTrainTimeTable([0]);
    setStationListView([]);
  }, [line]);

  useEffect(() => {
    setStationTimeTable([]);
    setTrainTimeTable([]);
    setDirection("");
    setStationListView([]);
  }, [originStation]);

  useEffect(() => {
    setTrainTimeTable([]);
  }, [direction]);

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
        // console.log(data[0]["odpt:stationOrder"]);
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
        setLineInfo([
          {
            color: data[0]["odpt:color"],
            ascending: ascending,
            ascending_tile: {
              en: data[0]["odpt:stationOrder"][
                data[0]["odpt:stationOrder"].length - 1
              ]["odpt:stationTitle"]["en"],
              ja: data[0]["odpt:stationOrder"][
                data[0]["odpt:stationOrder"].length - 1
              ]["odpt:stationTitle"]["ja"],
            },
            descending: descending,
            descending_title: {
              en: data[0]["odpt:stationOrder"][0]["odpt:stationTitle"]["en"],
              ja: data[0]["odpt:stationOrder"][0]["odpt:stationTitle"]["ja"],
            },
          },
        ]);
        setStationList(data[0]["odpt:stationOrder"]);
      };
      getStation();
    }
  }, [line]);

  useEffect(() => {
    var name = originStation.replace("odpt.Station:", "");
    const getStationTimeTable = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.StationTimetable:${name}.${direction}.${day}?acl:consumerKey=${apiKey}`
      );
      if (data.length > 0) {
        setStationTimeTable(data[0]["odpt:stationTimetableObject"]);
      }
    };
    getStationTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);
  useEffect(() => {
    setStationListView(
      lineInfo[0]["ascending"] === direction
        ? stationList
        : stationList.reverse()
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineInfo, direction]);
  useEffect(() => {
    var name = line.replace("odpt.Railway:", "");
    const getTrainTimeTable = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/datapoints/odpt.TrainTimetable:${name}.${trainNumber}.${day}?acl:consumerKey=${apiKey}`
      );
      if (data.length > 0) {
        // console.log(data[0]);
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
            language={language}
          />
          <LineSelect
            lineList={lineList}
            line={line}
            setLine={setLine}
            language={language}
          />
          <OriginSelect
            stationList={stationList}
            originStation={originStation}
            setOriginStation={setOriginStation}
            language={language}
          />
          <DirectionSelect
            lineInfo={lineInfo}
            direction={direction}
            setDirection={setDirection}
            language={language}
          />
        </div>
        <div className="col">
          <p className="fs-3">{language === "en" ? "Schedule" : "ダイヤ"}</p>
          <StationTimeTable
            list={stationTimeTable}
            operator={operator}
            time={time}
            setTrainNumber={setTrainNumber}
            language={language}
          />
        </div>
        <div className="col">
          <p className="fs-3">
            {language === "en" ? "Train Itinerary" : "列車経路"}
          </p>
          {trainTimeTable.length > 0 ? (
            <TrainTimeTable
              stationListView={stationListView}
              trainTimeTable={trainTimeTable}
              color={lineInfo[0]["color"]}
              station={originStation}
              time={time}
              language={language}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
};

export default Train;
