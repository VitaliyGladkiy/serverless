'use strict';
const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.save = (payload, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuidv1(),
            text: payload.message
        }
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            console.log(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {'content-Type': 'text/plain'},
                body: "couldn't create item"
            });
            return
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
};

module.exports.getById = (id, callback) => {
    const params = {
        Key: {
            id: id
        },
        TableName: process.env.DYNAMODB_TABLE
    };

    dynamoDb.get(params, (err, result) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
        callback(null,response);
    });
};

module.exports.saveToJournal = (payload, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_JOURNAL_TABLE,
        Item: {
            id: uuidv1(),
            text: payload.message
        }
    };


    dynamoDb.put(params, (error) => {
        if (error) {
            console.log(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {'content-Type': 'text/plain'},
                body: "couldn't create item"
            });
            return
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
};

module.exports.getJournal = (callback) => {
    const params = {
        TableName: process.env.DYNAMODB_JOURNAL_TABLE,
    };
    console.log('Journal: ', params);
    dynamoDb.scan(params, (error, response) => {
        if (error) {
            console.log('error while get journal: ', error);
            callback(null, {statusCode: 500, body: 'ERROR!'})
        }
        console.log('journal: ', response);
        callback(null, {statusCode: 200, body: JSON.stringify(response)})
    });
};
