import { getRestaurantById } from '../../handlers/getRestaurantById';
import { dynamoClient } from '../../utils/dynamoClient';

jest.mock('../../utils/dynamoClient');

describe('getRestaurantById', () => {
  test('should return a restaurant by ID', async () => {
    const mockId = '1';
    const mockRestaurant = { id: mockId, name: 'Restaurant 1' };
    dynamoClient.get.mockResolvedValue({ Item: mockRestaurant });

    const response = await getRestaurantById(mockId);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(mockRestaurant));
  });

  test('should handle missing restaurant', async () => {
    const mockId = '1';
    dynamoClient.get.mockResolvedValue({});
    const response = await getRestaurantById(mockId);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(JSON.stringify({ error: 'Restaurant not found' }));
  });

  test('should handle DynamoDB error', async () => {
    const mockId = '1';
    dynamoClient.get.mockRejectedValue(new Error('DynamoDB error'));
    const response = await getRestaurantById(mockId);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(JSON.stringify({ error: 'Could not fetch restaurant-DynamoDB error' }));
  });
});
