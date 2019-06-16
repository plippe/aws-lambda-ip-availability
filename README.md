# AWS Lambda IP Availability

Subnets have a limited amount of available IP addresses. Once they have all
been distributed, no other instance can be started in that subnet. This
impacts resources that would automatically scale to meet demand.

To avoid being caught without any remaining IPs, an AWS CloudWatch alarm should
be created, but that metric isn't available.

This repository contains a simple JavaScript function that publishes the total
amount of IPs, and the remaining amount on AWS CloudWatch. The metrics are
divided by region, by vpc, and by subnet.

### Getting started
```sh
npm install
AWS_REGION=us-east-1 node src/index.js
```
