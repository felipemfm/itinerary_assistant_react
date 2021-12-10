import React, { useState, useEffect } from "react";
import axios from "axios";

import OperatorSelect from "./components/OperatorSelect";
import LineSelect from "./components/LineSelect";
import OriginSelect from "./components/OriginSelect";
import AscendingTimeTable from "./components/AscendingTimeTable";
import DescendingTimeTable from "./components/DescendingTimeTable";

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [day, setDay] = useState("");
  const operatorList = ["JR-East", "TokyoMetro", "Toei"];
  const [operator, setOperator] = useState("");
  const [lineList, setLineList] = useState([]);
  const [line, setLine] = useState("");
  const [stationList, setStationList] = useState([]);
  const [originStation, setOriginStation] = useState("");
  const [ascending, setAscending] = useState("");
  const [ascendingList, setAscendingList] = useState([]);
  const [descending, setDescending] = useState("");
  const [descendingList, setDescendingList] = useState([]);

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
        setAscending(
          data[0]["odpt:ascendingRailDirection"].replace(
            "odpt.RailDirection:",
            ""
          )
        );
        setDescending(
          data[0]["odpt:descendingRailDirection"].replace(
            "odpt.RailDirection:",
            ""
          )
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
        console.log(data[0]["odpt:stationTimetableObject"]);
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
        console.log(data[0]["odpt:stationTimetableObject"]);
      }
    };
    getDescendingTimeTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originStation, descending]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
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
          <h5>AscendingTimeTable</h5>
          <AscendingTimeTable
            ascendingList={ascendingList}
            operator={operator}
          />
        </div>
        <div className="col">
          <h5>DescendingTimeTable</h5>
          <DescendingTimeTable
            descendingList={descendingList}
            operator={operator}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
