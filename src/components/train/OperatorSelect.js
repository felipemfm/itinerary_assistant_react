import React from "react";

const OperatorSelect = ({ operator, setOperator, language }) => {
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
        <option key={1} value="JR-East">
          {language === "en" ? "JR-East" : "JR東日本"}{" "}
        </option>
        <option key={2} value="TokyoMetro">
          {language === "en" ? "Tokyo Metro" : "東京メトロ"}
        </option>
        <option key={3} value="Toei">
          {language === "en" ? "Toei" : "東映"}
        </option>
        <option key={4} value="TWR">
          {language === "en" ? "TWR Rinkai Line" : "TWR りんかい線"}
        </option>
        <option key={5} value="TamaMonorail">
          {language === "en" ? "Tama Monorail" : "多摩モノレール"}
        </option>
        <option key={6} value="Keisei">
          {language === "en" ? "Keisei" : "京成"}
        </option>
        <option key={7} value="Keikyu">
          {language === "en" ? "Keikyu" : "京急"}
        </option>
        <option key={8} value="Keio">
          {language === "en" ? "Keio" : "京王"}
        </option>
        <option key={9} value="Tokyu">
          {language === "en" ? "Tokyu" : "東急"}
        </option>
        <option key={10} value="Yurikamome">
          {language === "en" ? "Yurikamome" : "ゆりかもめ"}
        </option>
      </select>
    </div>
  );
};

export default OperatorSelect;
