import { dynamoClient, TABLE_NAME } from '../utils/dynamoClient.mjs';
import { createResponse } from '../utils/response.mjs';
import { snsClient } from '../utils/snsClient.mjs';

export const rateRestaurant = async (id, { rating }) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: id.toString() }
    };
    const restaurantData = await dynamoClient.get(params);

    if (!restaurantData.Item) {
      return createResponse(404, { error: 'Restaurant not found' });
    }

    const restaurant = restaurantData.Item;
    const newRatings = [...restaurant.ratings, rating];
    const newAverageRating = (newRatings.reduce((a, b) => a + b)) / newRatings.length;
    let lastFiveAverageRating = 0;
    if(newRatings.length > 5){
      lastFiveAverageRating = (newRatings.slice(-5).reduce((a, b) => a + b)) / 5;
    }

    const updateParams = {
      TableName: TABLE_NAME,
      Key: { id : id.toString() },
      UpdateExpression: 'set ratings = :ratings, averageRating = :averageRating',
      ExpressionAttributeValues: {
        ':ratings': newRatings,
        ':averageRating': newAverageRating
      },
      ReturnValues: 'ALL_NEW'
    };

    const updatedRestaurant = await dynamoClient.update(updateParams);

    if (lastFiveAverageRating > 0 && lastFiveAverageRating < restaurant.averageRating) {
      const message = `Restaurant ${restaurant.name} has a new average rating of ${lastFiveAverageRating} for the last 5 ratings, which is below the total average rating of ${newAverageRating}.`;
      await snsClient.publish(message);
    }

    return createResponse(200, updatedRestaurant.Attributes);
  } catch (error) {
    return createResponse(500, { error: 'Could not rate restaurant-'+ error.message});
  }
};