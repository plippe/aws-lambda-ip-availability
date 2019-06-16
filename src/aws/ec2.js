const AWS = require("aws-sdk");
const EC2 = new AWS.EC2();

const forEachRegion = callback => {
  EC2.describeRegions().eachItem((err, data) => {
    if (err !== null) console.error(err, err.stack);
    if (data !== null) callback(data);
  });
};

const forEachSubnet = (region, callback) => {
  const EC2 = new AWS.EC2({
    region: region
  });
  EC2.describeSubnets().eachItem((err, data) => {
    if (err !== null) console.error(err, err.stack);
    if (data !== null) callback(data);
  });
};

module.exports = {
  forEachRegion: forEachRegion,
  forEachSubnet: forEachSubnet
};
