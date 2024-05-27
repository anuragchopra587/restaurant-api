import AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient();
export const TABLE_NAME = 'Restaurants';

export const dynamoClient = {
  get: (params) => dynamo.get(params).promise(),
  put: (params) => dynamo.put(params).promise(),
  update: (params) => dynamo.update(params).promise(),
  delete: (params) => dynamo.delete(params).promise(),
  scan: (params) => dynamo.scan(params).promise()
};