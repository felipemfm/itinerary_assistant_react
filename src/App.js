import React, { useState } from "react";
import Bus from "./components/Bus";
import Train from "./components/Train";

const App = () => {
  const [mode, setMode] = useState("Train");
  const modeList = ["Train", "Bus"];

  const switchMode = () => {
    switch (mode) {
      case "Train":
        return <Train />;
      case "Bus":
        return <Bus />;
      default:
        <Train />;
    }
  };

  return (
    <div className="container my-2">
      <div class="row align-items-center">
        <div class="col-11">
          <h3>Tokyo Public</h3>
          <h3>Transportaion Guide</h3>
        </div>
        <div class="col-1">
          <div className="col-form-group">
            <select
              value={mode}
              className="form-control form-select"
              onChange={(e) => setMode(e.target.value)}
            >
              {modeList.map((element, index) => {
                return (
                  <option key={index + 1} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {switchMode()}
    </div>
  );
};

export default App;
