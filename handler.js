const db = require('./database/dbClient');

module.exports.isAlive = ( event, context, callback )=> {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'it\'s alive!',
      },
    ),
  };

  callback(null, response);
};

module.exports.saveMessage = (event, context, callback) => {
    const payload = event.body;
    db.save(JSON.parse(payload), callback);
};

module.exports.getMessage = (event, context, callback) => {
    db.getById(event.pathParameters.id, callback)
};
