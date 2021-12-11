const getName = (words) => {
    var n = words.split(".");
    return n[n.length - 1];
  };

  const getCountdown = (time, departure) => {
    var n = time.split(":");
    var m = departure.split(":");
    return Math.abs(n[0] - m[0]) * 60 + Math.abs(n[1] - m[1]);
  };

  export {getName, getCountdown};