const db = require('./database/dbClient');
const publisher = require('./publisher');

module.exports.health = ( event, context, callback )=> {
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

module.exports.publish = (event, context, callback) => {
    publisher.snsPublisher(callback);
};

module.exports.subscriber = (event, context, callback) => {
    db.saveToJournal({message: 'subscriber get an message'}, callback)
};

module.exports.showJournal = (event, context, callback) => {
    db.getJournal(callback)
};
