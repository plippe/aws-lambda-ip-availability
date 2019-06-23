const AWS = require("aws-sdk");
const CloudWatch = new AWS.CloudWatch();

const putMetricData = params => {
  CloudWatch.putMetricData(params, (err, data) => {
    if (err !== null) console.error(err, err.stack);
  });
};

const metricData = (
  regionName,
  vpcId,
  subnetId,
  totalIpAddress,
  availableIpAddressCount
) => {
  const metricDataDimensions = (regionName, vpcId, subnetId) => {
    return [
      { Name: "Region", Value: regionName },
      { Name: "VpcId", Value: vpcId },
      { Name: "SubnetId", Value: subnetId }
    ];
  };

  const metricData = (name, value, dimensions) => {
    return { MetricName: name, Value: value, Dimensions: dimensions };
  };

  return {
    Namespace: "subnet-ip-availability",
    MetricData: [
      metricData(
        "TotalIpAddress",
        totalIpAddress,
        metricDataDimensions(regionName, vpcId, subnetId)
      ),
      metricData(
        "AvailableIpAddress",
        availableIpAddressCount,
        metricDataDimensions(regionName, vpcId, subnetId)
      )
    ]
  };
};

module.exports = {
  metricData: metricData,
  putMetricData: putMetricData
};
