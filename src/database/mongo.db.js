const { MongoClient, GridFSBucket } = require("mongodb");
const { cxnString, dbName } = require("../config");

let db;
let gridFSBucket;

const connect = async () => {
  if (db) {
    return db;
  }
  const client = new MongoClient(cxnString);

  try {
    await client.connect();
    db = client.db(dbName);
    console.log("MongoDB Connection Successful");

    // Create the database and collections if they don't exist
    await createCollections();

    return db;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const createCollectionIfNotExists = async (collectionName) => {
  const collections = await db.listCollections().toArray();
  const collectionExists = collections.some(
    (collection) => collection.name === collectionName
  );

  if (!collectionExists) {
    await db.createCollection(collectionName);
    console.log(`Created '${collectionName}' collection`);
  }
};

const createCollections = async () => {
  await createCollectionIfNotExists("projects");
  // Add more collection creation calls here if needed
};

const getGridFSBucket = async () => {
  if (!db) {
    await connect();
  }
  if (!gridFSBucket) {
    //TODO: Refactor BucketName to ENV
    gridFSBucket = new GridFSBucket(db, { bucketName: 'uploads' });
  }

  return gridFSBucket;
};


// Assign all functions and variables to a single object
const mongoDatabase = {
  connect,
  getGridFSBucket
};

// Export the module
module.exports = mongoDatabase;