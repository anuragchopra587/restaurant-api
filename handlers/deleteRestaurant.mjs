import { dynamoClient, TABLE_NAME } from '../utils/dynamoClient.mjs';
import { createResponse } from '../utils/response.mjs';

export const deleteRestaurant = async (id) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: id.toString() }
    };
    await dynamoClient.delete(params);
    return createResponse(200, { message: 'Restaurant deleted successfully' });
  } catch (error) {
    return createResponse(500, { error: 'Could not delete restaurant-' + error.message});
  }
};
