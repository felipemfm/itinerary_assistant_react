const getName = (words) => {
  var n = words.split(".");
  return n[n.length - 1];
};

const getCountdown = (time, departure) => {
  var n = time.split(":");
  var m = departure.split(":");
  // if(n[0] === 0) n[0] += 24;
  // if(m[0] === 0) m[0] += 24;
  // return m[0] * 60 - n[0] * 60 + m[1] - n[1];
  let start = new Date();
  start.setHours(n[0]);
  start.setMinutes(n[1]);

  let end = new Date();
  end.setHours(m[0]);
  end.setMinutes(m[1]);
  return (end - start)/60000;
};

export { getName, getCountdown };
