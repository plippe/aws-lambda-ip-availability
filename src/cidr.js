const IPCIDR = require("ip-cidr");

const ipAddressCount = cidrStr => {
  const cidr = new IPCIDR(cidrStr);
  return cidr.isValid() ? cidr.toArray().length : 0;
};

module.exports = {
  ipAddressCount: ipAddressCount
};
