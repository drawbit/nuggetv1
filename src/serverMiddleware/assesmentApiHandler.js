import DB from './MongoConnect';
const ObjectId = require('mongodb').ObjectID;

export function getalltests(req, res, next) {
  DB.then((database) => {
    const collection = database.collection("assements");
    collection.find().toArray(function(err, list) {
      res.json(list);
      //database.close();
      next();
    });
  });
}

export function getATest(req, res, next) {
  DB.then((database) => {
    const collection = database.collection("assements");
    collection.findOne({'_id': ObjectId(req.params.testid)}, function(err, list) {
      res.json(list);
      //database.close();
      next();
    });
  });
}


export function postCreatetest(req, res) {
  if( !req.session.user || req.session.user.account_type !== 1 ){
    res.json({error: true, message: 'You dont have permission to Create a New Test'});
  }
  DB.then((database) => {
    const collection = database.collection("assements");
    let dataToSave = {details: req.body, createdBy: req.session.user.user_id};
    if( typeof(collection.length)=="undefined")
          dataToSave = [dataToSave];

    collection.insert(dataToSave, function(error, docs) {
      res.json(docs);
    });
  });
}
