import { dynamoClient, TABLE_NAME } from '../utils/dynamoClient.mjs';
import { createResponse } from '../utils/response.mjs';

export const getRestaurantById = async (id) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id : id.toString() }
    };
    const data = await dynamoClient.get(params);
    if (!data.Item) {
      return createResponse(404, { error: 'Restaurant not found' });
    }
    return createResponse(200, data.Item);
  } catch (error) {
    return createResponse(500, { error: 'Could not fetch restaurant-' + error.message });
  }
};
