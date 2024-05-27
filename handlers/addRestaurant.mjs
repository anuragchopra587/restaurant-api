import { dynamoClient, TABLE_NAME } from '../utils/dynamoClient.mjs';
import { createResponse } from '../utils/response.mjs';
import { v4 as uuidv4 } from 'uuid';

export const addRestaurant = async (restaurant) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        ...restaurant,
        averageRating: 0,
        ratings:[]
      }
    };
    await dynamoClient.put(params);
    return createResponse(201, params.Item);
  } catch (error) {
    return createResponse(500, { error: 'Could not add a restaurant-' + error.message});
  }
};

