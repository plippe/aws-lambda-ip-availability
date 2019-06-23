const EC2 = require("./aws/ec2");
const CloudWatch = require("./aws/cloudwatch");
const CIDR = require("./cidr");

exports.handler = () =>
  EC2.forEachRegion(region =>
    EC2.forEachSubnet(region.RegionName, subnet => {
      const totalIpAddresses = CIDR.ipAddressCount(subnet.CidrBlock);
      const params = CloudWatch.metricData(
        region.RegionName,
        subnet.VpcId,
        subnet.SubnetId,
        totalIpAddresses,
        subnet.AvailableIpAddressCount
      );

      CloudWatch.putMetricData(params);
    })
  );

console.log("Hello, World");
