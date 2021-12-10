import React from "react";

const DescendingTimeTable = ({ descendingList, operator }) => {
  return (
      
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Departure Time</th>
          <th scope="col">Type</th>
          <th scope="col">Destination</th>
        </tr>
      </thead>
      <tbody>
        {descendingList.map((data, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data["odpt:departureTime"]}</td>
              <td>
                {data["odpt:trainType"].replace(
                  `odpt.TrainType:${operator}.`,
                  ""
                )}
              </td>
              <td>{getName(data["odpt:destinationStation"][0])}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function getName(words) {
  var n = words.split(".");
  return n[n.length - 1];
}

export default DescendingTimeTable;
