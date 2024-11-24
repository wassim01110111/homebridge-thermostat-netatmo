"use strict";
var request = require("request");

class NetatmoAPI {
  constructor(accessToken) {
    this.token = accessToken;
  }

  getThermostatState() {
    var deferred = new Promise((resolve, reject) => {
      request(
        {
          url: "https://api.netatmo.com/api/homestatus",
          qs: { access_token: this.token },
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var processedData = NetatmoAPI.processData(body);
            if (!processedData) {
              reject("No data found.");
              return;
            }

            resolve(processedData);
            return;
          } else {
            if (!error && body) {
              error = body;
            }
            var errorstr =
              "Error getting thermostat state (status code " +
              response.statusCode +
              "): " +
              error;
            reject(errorstr);
            return;
          }
        }
      );
    });

    return deferred;
  }

  setThermostat(data) {
    var deferred = new Promise((resolve, reject) => {
      request(
        {
          url: "https://api.netatmo.com/api/setroomthermpoint",
          qs: {
            access_token: this.token,
            home_id: data["home_id"],
            room_id: data["room_id"],
            temp: data["temperature"],
            mode: data["mode"],
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var processedData = NetatmoAPI.processAPIResponse(body);
            if (!processedData) {
              reject("Setting thermostate state failed (invalid response)");
              return;
            }

            resolve(processedData);
            return;
          } else {
            if (!error && body) {
              error = body;
            }
            var errorstr =
              "Setting thermostate state failed (status code " +
              response.statusCode +
              "): " +
              error;
            reject(errorstr);
            return;
          }
        }
      );
    });

    return deferred;
  }

  setThermoMode(data) {
    var deferred = new Promise((resolve, reject) => {
      request(
        {
          url: "https://api.netatmo.com/api/setroomthermpoint",
          qs: {
            access_token: this.token,
            home_id: data["home_id"],
            mode: data["mode"],
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var processedData = NetatmoAPI.processAPIResponse(body);
            if (!processedData) {
              reject("Setting thermostate state failed (invalid response)");
              return;
            }

            resolve(processedData);
            return;
          } else {
            if (!error && body) {
              error = body;
            }
            var errorstr =
              "Setting thermostate state failed (status code " +
              response.statusCode +
              "): " +
              error;
            reject(errorstr);
            return;
          }
        }
      );
    });

    return deferred;
  }

  static processAPIResponse(text) {
    var data = JSON.parse(text);
    if (data.status !== "ok") {
      return null;
    }
    return data;
  }

  static processData(text) {
    var data = this.processAPIResponse(text);
    if (!data) {
      return null;
    }
    var home = data.body.home;
    var thermostat = home.modules[0];
    var thermostat2 = home.modules[1];
    var room = home.rooms[0];
    var result = {
      room_id: thermostat.id,
      temperature: room.therm_measured_temperature,
      heatingOn: thermostat2.boiler_status,
      setPoint: room.therm_setpoint_temperature,
      mode: room.therm_setpoint_mode,
    };

    return result;
  }
}

module.exports = NetatmoAPI;
