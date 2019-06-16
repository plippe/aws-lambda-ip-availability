const EC2 = require("./aws/ec2");
const CloudWatch = require("./aws/cloudwatch");
const CIDR = require("./cidr");

const metricData = (region, subnet) => {
  const metricDataDimensions = (region, subnet) => {
    return [
      { Name: "Region", Value: region.RegionName },
      { Name: "VpcId", Value: subnet.VpcId },
      { Name: "SubnetId", Value: subnet.SubnetId }
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
        CIDR.ipAddressCount(subnet.CidrBlock),
        metricDataDimensions(region, subnet)
      ),
      metricData(
        "AvailableIpAddress",
        subnet.AvailableIpAddressCount,
        metricDataDimensions(region, subnet)
      )
    ]
  };
};

const main = () =>
  EC2.forEachRegion(region =>
    EC2.forEachSubnet(region.RegionName, subnet => {
      const params = metricData(region, subnet);
      CloudWatch.putMetricData(params);
    })
  );

(() => main())();
console.log("Hello, World");
