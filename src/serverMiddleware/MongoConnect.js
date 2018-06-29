const MongoClient = require('mongodb').MongoClient;
let precreatedConnection;

// Initialize connection once
const DB = new Promise((resolve, reject) => {
  if(typeof(precreatedConnection) != 'undefined'){
    console.log('Mongo connected served a precreated connection');
    resolve(precreatedConnection);
  }
  MongoClient.connect(`mongodb://${__DEVELOPMENT__ ? '127.0.0.1' : 'sapy:nugget123secretmysql@52.15.131.207'}:27017`, function(err, database) {
    if (err) {
      console.log('Mongo Database failed to connect %s', err);
      reject(err);
    } else {
      console.log('Successfully connected to MongoDB on port 27017');
      precreatedConnection = database.db('nugget-object-store');
      resolve(precreatedConnection);
    }

  })
});

export default DB;