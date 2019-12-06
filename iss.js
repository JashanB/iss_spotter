/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const website = 'https://api.ipify.org?format=json';
const fetchMyIP = function(callback) {
  request(website, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      if (data) {
        callback(null, data["ip"]);
      } else {
        callback(null, 'not found');
      }
    }
  });
};
const websiteCoord = 'https://ipvigilante.com/';
const fetchCoordsByIp = function(ip, callback) {
  const dataOutgoingObject = {};
  request(websiteCoord + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const dataIncomingObject = JSON.parse(body);
      let latitude = dataIncomingObject.data["latitude"];
      let longitude = dataIncomingObject.data["longitude"];
      dataOutgoingObject['latitude'] = latitude;
      dataOutgoingObject['longitude'] = longitude;
      callback(null, dataOutgoingObject);
    }
  });
};
// module.exports = { fetchMyIP, fetchCoordsByIp };
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const issWeb = 'http://api.open-notify.org/iss-pass.json?lat=';
//lat=43.63830&lon=-79.43010
//going to put websiteFlyTimes + lat=${lat}  + lon =${lon}
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`${issWeb}${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code: ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const dataFlyTimes = JSON.parse(body);
      const flyTimes = dataFlyTimes["response"];
      callback(null, flyTimes);
    }
  });
};
// module.exports = { fetchISSFlyOverTimes };

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ipAddress) => {
    if (error) {
      callback(error);
    } else {
      fetchCoordsByIp(ipAddress, (error, coordinates) => {
        if (error) {
          callback(error);
        } else {
          fetchISSFlyOverTimes(coordinates, (error, flyTimes) => {
            if (error) {
              callback(error);
            } else {
              callback(null, flyTimes);
            }
          });
        }
      });
    }
  });
};
module.exports = { nextISSTimesForMyLocation };