import React, { useState, useEffect } from "react";
import axios from "axios";

import OperatorSelect from "./components/OperatorSelect";
import LineSelect from "./components/LineSelect";
import OriginSelect from "./components/OriginSelect";

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const operatorList = ["JR-East", "TokyoMetro", "Toei"];
  const [operator, setOperator] = useState("");
  const [lineList, setLineList] = useState([]);
  const [line, setLine] = useState("");
  const [stationList, setStationList] = useState([]);
  const [originStation, setOriginStation] = useState("");
  const [ascending, setAscending] = useState("");
  const [descending, setDescending] = useState("");

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

  return (
    <div className="container">
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
  );
};

export default App;
