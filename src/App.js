import React, { useState } from "react";
// import Bus from "./components/Bus";
import Train from "./components/Train";

const App = () => {
  // const [mode, setMode] = useState("Train");
  const [language, setLanguage] = useState("en");
  // const switchMode = () => {
  // switch (mode) {
  //   case "Train":
  //     return <Train language={language}/>;
  //   case "Bus":
  //     return <Bus language={language}/>;
  //   default:
  //     <Train />;
  // }
  // };

  return (
    <div className="container my-2">
      <div className="row align-items-center">
        <div className="col-8">
          <h3>
            {language === "en" ? "Tokyo Public Transportaion" : "東京公共交通"}
          </h3>
          <h3>{language === "en" ? "Helper" : "ヘルパー "}</h3>
        </div>
        <div className="col-2">
          {/* <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              value="Train"
              className={
                mode === "Train"
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              onClick={(e) => setMode(e.target.value)}
            >
              Train
            </button>
            <button
              type="button"
              className={
                mode === "Bus"
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              value="Bus"
              onClick={(e) => setMode(e.target.value)}
            >
              Bus
            </button>
          </div> */}
        </div>
        <div className="col-2">
          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              value="en"
              className={
                language === "en"
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              onClick={(e) => setLanguage(e.target.value)}
            >
              EN
            </button>
            <button
              type="button"
              className={
                language === "ja"
                  ? "btn btn-secondary"
                  : "btn btn-outline-secondary"
              }
              value="ja"
              onClick={(e) => setLanguage(e.target.value)}
            >
              JP
            </button>
          </div>
        </div>
      </div>
      {<Train language={language}/>}
    </div>
  );
};

export default App;
