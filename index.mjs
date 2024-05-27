import { getRestaurants } from './handlers/getRestaurants.mjs';
import { getRestaurantById } from './handlers/getRestaurantById.mjs';
import { addRestaurant } from './handlers/addRestaurant.mjs';
import { updateRestaurant } from './handlers/updateRestaurant.mjs';
import { deleteRestaurant } from './handlers/deleteRestaurant.mjs';
import { rateRestaurant } from './handlers/rateRestaurant.mjs';

export const handler = async (event) => {
  const { httpMethod, path, pathParameters, body } = event;

  switch (httpMethod) {
    case 'GET':
      if (pathParameters && pathParameters.id) {
        console.log('Get Product By Id',pathParameters.id);
        return await getRestaurantById(pathParameters.id);
      } else {
        console.log('Get Products');
        return await getRestaurants();
      }
    case 'POST':
      if (pathParameters && pathParameters.id && path.endsWith('/updateRating')) {
        return await rateRestaurant(pathParameters.id, JSON.parse(body));
      } else {
        return await addRestaurant(JSON.parse(body));
      }
    case 'PUT':
      console.log('Update Product');
      return await updateRestaurant(pathParameters.id, JSON.parse(body));
    case 'DELETE':
      console.log('Delete Product');
      return await deleteRestaurant(pathParameters.id);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ 
        message: 'Method Not Allowed',
        httpMethod: httpMethod,
        path: path,
        pathParameters: pathParameters 
      })
      };
  }
};
