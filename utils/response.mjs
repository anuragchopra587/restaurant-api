export const createResponse = (statusCode, message) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
  },
    body: JSON.stringify(message)
  };
};