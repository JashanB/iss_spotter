const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = function(passTimes) {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
};
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });