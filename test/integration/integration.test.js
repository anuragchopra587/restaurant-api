import { rateRestaurant } from '../../handlers/rateRestaurant';
import { dynamoClient } from '../../utils/dynamoClient';
import { snsClient } from '../../utils/snsClient';

jest.mock('../../utils/dynamoClient');
jest.mock('../../utils/snsClient');

describe('rateRestaurant handler', () => {
  it('should rate a restaurant and trigger notification if rating falls below average', async () => {
    const id = '1';
    const rating = 1;
    const restaurant = {
      id,
      name: 'Restaurant 1',
      averageRating: 4,
      ratings: [5, 4, 3, 5, 5, 5]
    };

    dynamoClient.get.mockResolvedValueOnce({ Item: restaurant });
    dynamoClient.update.mockResolvedValueOnce({ Attributes: restaurant });
    snsClient.publish.mockResolvedValueOnce();

    const response = await rateRestaurant(id, { rating });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(expect.objectContaining(restaurant));
    expect(snsClient.publish).toHaveBeenCalled();
  });

  it('should return error if unable to rate restaurant', async () => {
    const id = '1';
    const rating = 3;
    dynamoClient.get.mockRejectedValueOnce(new Error('Error fetching restaurant'));

    const response = await rateRestaurant(id, { rating });

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Could not rate restaurant-Error fetching restaurant' });
  });
});
