import AWS from 'aws-sdk';

const sns = new AWS.SNS();
const SNS_TOPIC_ARN = 'arn:aws:sns:ap-southeast-2:471112878007:restaurantRatingTopic'; 

export const snsClient = {
  publish: (message) => {
    const params = {
      Message: message,
      TopicArn: SNS_TOPIC_ARN
    };
    return sns.publish(params).promise();
  }
};