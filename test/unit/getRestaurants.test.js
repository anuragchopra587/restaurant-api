import { getRestaurants } from '../../handlers/getRestaurants';
import { dynamoClient } from '../../utils/dynamoClient';

jest.mock('../../utils/dynamoClient');

describe('getRestaurants', () => {
  test('should return restaurants', async () => {
    const mockData = { Items: [{ id: '1', name: 'Restaurant 1' }, { id: '2', name: 'Restaurant 2' }] };
    dynamoClient.scan.mockResolvedValue(mockData);
    const response = await getRestaurants();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(mockData.Items));
  });

  test('should handle DynamoDB error', async () => {
    dynamoClient.scan.mockRejectedValue(new Error('DynamoDB error'));
    const response = await getRestaurants();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(JSON.stringify({ error: 'Could not fetch restaurants-DynamoDB error' }));
  });
});
