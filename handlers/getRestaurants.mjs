import { dynamoClient, TABLE_NAME } from '../utils/dynamoClient.mjs';
import { createResponse } from '../utils/response.mjs';

export const getRestaurants = async () => {
  try {
    const params = { TableName: TABLE_NAME };
    const data = await dynamoClient.scan(params);
    return createResponse(200, data.Items);
  } catch (error) {
    return createResponse(500, { error: 'Could not fetch restaurants-' + error.message });
  }
};

