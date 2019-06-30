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

### AWS Lambda
This application works best as a function on AWS Lambda. All the scripts are
available to create the stack, and publish the function.

```sh
# Install dependencies
npm install

# Create AWS CloudFormation stack (can take some time)
npm run create-stack

# Create a zip archive
npm run package

# Publish the code
npm run publish
```
