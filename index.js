// const { fetchMyIP, fetchCoordsByIp } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
 
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });
// fetchCoordsByIp('66.207.199.230', (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log(data);
// });
// fetchISSFlyOverTimes({ latitude: '43.63830', longitude: '-79.43010' }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log(data);
// });
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});