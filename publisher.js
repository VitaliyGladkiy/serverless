const AWS = require('aws-sdk');
const SNS = new AWS.SNS();

function snsPublisher(callback) {
    console.log('Publish message into the topic');

    SNS.publish({
        Message: 'some test with SNS',
        TopicArn: 'arn:aws:sns:us-east-1:758472204456:test-topic'
    }, function (err, data) {
        if(err) {
            console.log('has an error: ', err.stack);
            const response = {
                statusCode: 500,
                body: JSON.stringify(err.stack)
            };
            callback(null,response);
        }
        console.log('push sent');
        console.log(data);
        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        };
        callback(null,response);
    });
}

module.exports = {
    snsPublisher: snsPublisher
};
