import React from "react";

const OperatorSelect = ({ operatorList, operator, setOperator, language }) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {language === "en" ? "Line Operator" : "鉄道会社"}
      </label>
      <select
        value={operator}
        className="form-control form-select"
        onChange={(e) => setOperator(e.target.value)}
      >
        <option key={0} defaultValue=""></option>
        <option key={1} disabled>
          {language === "en"
            ? "Schedule And Itinerary:"
            : "ダイヤと列車経路:"}
        </option>
        <option key={2} value="JR-East">
        {language === "en"
            ? "JR-East"
            : "JR東日本"}
        </option>
        <option key={3} value="TokyoMetro">
        {language === "en"
            ? "Tokyo Metro"
            : "東京メトロ"}
        </option>
        <option key={4} value="Toei">
        {language === "en"
            ? "Toei"
            : "東映"}
        </option>
        <option key={5} value="TWR">
        {language === "en"
            ? "TWR Rinkai Line"
            : "TWR りんかい線"}
        </option>
        <option key={6} value="TamaMonorail">
        {language === "en"
            ? "Tama Monorail"
            : "多摩モノレール"}
        </option>
        <option key={7} disabled>
        {language === "en"
            ? "Schedule:"
            : "ダイヤ"}
        </option>
        <option key={8} value="Keisei">
        {language === "en"
            ? "Keisei"
            : "京成"}
        </option>
        <option key={9} value="Keikyu">
        {language === "en"
            ? "Keikyu"
            : "京急"}
        </option>
        <option key={10} value="Keio">
        {language === "en"
            ? "Keio"
            : "京王"}
        </option>
        <option key={11} value="Tokyu">
        {language === "en"
            ? "Tokyu"
            : "東急"}
        </option>
        <option key={12} value="Yurikamome">
        {language === "en"
            ? "Yurikamome"
            : "ゆりかもめ"}
        </option>
      </select>
    </div>
  );
};

export default OperatorSelect;
