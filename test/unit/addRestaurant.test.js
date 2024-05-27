import { addRestaurant } from '../../handlers/addRestaurant';
import { dynamoClient } from '../../utils/dynamoClient';

jest.mock('../../utils/dynamoClient');

describe('addRestaurant handler', () => {
  it('should add a restaurant', async () => {
    const restaurant = { name: 'New Restaurant', address: 'New Address', description: 'Description', hours: '9am-5pm' };
    dynamoClient.put.mockResolvedValueOnce();

    const response = await addRestaurant(restaurant);

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toEqual(expect.objectContaining(restaurant));
  });

  it('should return error if unable to add restaurant', async () => {
    const restaurant = { name: 'New Restaurant', address: 'New Address', description: 'Description', hours: '9am-5pm' };
    dynamoClient.put.mockRejectedValueOnce(new Error('Error adding restaurant'));

    const response = await addRestaurant(restaurant);

    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body)).toEqual({ error: 'Could not add a restaurant-Error adding restaurant' });
  });
});
