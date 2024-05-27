import { dynamoClient, TABLE_NAME } from '../utils/dynamoClient.mjs';
import { createResponse } from '../utils/response.mjs';

export const updateRestaurant = async (id, restaurant) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id : id.toString()},
      UpdateExpression: 'set #name = :name, address = :address, description = :description, hours = :hours',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': restaurant.name,
        ':address': restaurant.address,
        ':description': restaurant.description,
        ':hours': restaurant.hours
      },
      ReturnValues: 'ALL_NEW'
    };
    const data = await dynamoClient.update(params);
    return createResponse(200, data.Attributes);
  } catch (error) {
    return createResponse(500, { error: 'Could not update restaurant-'+ error.message });
  }
};
