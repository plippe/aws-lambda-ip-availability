const AWS = require("aws-sdk");
const CloudWatch = new AWS.CloudWatch();

const putMetricData = params => {
  CloudWatch.putMetricData(params, (err, data) => {
    if (err !== null) console.error(err, err.stack);
  });
};

module.exports = {
  putMetricData: putMetricData
};
