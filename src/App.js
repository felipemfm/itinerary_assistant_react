import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const operatorList = ["JR-East", "TokyoMetro", "Toei"];
  const [operator, setOperator] = useState("");
  const [line, setLine] = useState("");
  const [lineList, setLineList] = useState([]);

  useEffect(() => {
    const getLine = async () => {
      const { data } = await axios.get(
        `https://api-tokyochallenge.odpt.org/api/v4/odpt:Railway?odpt:operator=odpt.Operator:${operator}&acl:consumerKey=${apiKey}`
      );
      // console.log(data);
      setLineList(data);
    };
    getLine();
  }, [operator]);

  return (
    <div className="container">
      <div className="form-group">
        <label className="form-label">Line Operator</label>
        <select
          value={operator}
          className="form-control form-select"
          onChange={(e) => setOperator(e.target.value)}
        >
          <option key="0" defaultValue=""></option>
          {operatorList.map((element, index) => {
            return (
              <option key={index + 1} value={element}>
                {element}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Train Line</label>
        <select
          value={line}
          className="form-control form-select"
          onChange={(e) => setLine(e.target.value)}
        >
          <option key="0" defaultValue=""></option>
          {lineList.map((data, index)=>{
              return data["odpt:stationOrder"].length > 1 ? (
                <option key={index+1} defaultValue={data["owl:sameAs"]}>
                  {data["odpt:railwayTitle"]["en"]}
                </option>
              ) : " ";
          })}
        </select>
      </div>
    </div>
  );
};

export default App;
