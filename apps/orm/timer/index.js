import schedule from "node-schedule";
import request from "request";
import config from "./config.js";

// Schedule a job to run every 5 seconds
schedule.scheduleJob("*/5 * * * * *", function () {
  request(
    config.check_url,
    {
      method: "POST",
      headers: {
        Referer: config.url,
        cookie: config.cookie,
      },
    },
    function (error, response, body) {
      console.log(body);
    }
  );
});

// schedule.cancelJob("*/5 * * * * *", function () {
//   console.log("cancel");
// });
