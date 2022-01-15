const getName = (words) => {
  var n = words.split(".");
  return n[n.length - 1];
};

const getCountdown = (time, departure) => {
  var n = time.split(":");
  var m = departure.split(":");
  let start = new Date();
  start.setHours(n[0] === "00" ? 24 + parseInt(n[0]) : n[0]);
  start.setMinutes(n[1]);

  let end = new Date();
  end.setHours(m[0] === "00" ? 24 + parseInt(m[0]) : m[0]);
  end.setMinutes(m[1]);
  return Math.floor((end - start) / 60000);
};

export { getName, getCountdown };
