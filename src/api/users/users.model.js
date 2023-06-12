const { ObjectId } = require("mongodb");
const mongoDatabase = require("../../database/mongo.db");
const Joi = require("joi");

class Users {
  static schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    provider: Joi.array().items(Joi.string().allow("")).optional(),
  });

  static async create(userData) {
    const db = await mongoDatabase.connect();
    const collection = db.collection("users");
    const result = await collection.insertOne(userData);
    return result.insertedId;
  }

  static async getAll() {
    const db = await mongoDatabase.connect();
    return db.collection("users").find().toArray();
  }

  static async getById(id) {
    const db = await mongoDatabase.connect();
    return db.collection("users").findOne({ _id: new ObjectId(id) });
  }

  static async getByEmail(email) {
    const db = await mongoDatabase.connect();
    return db.collection("users").findOne({ email: email });
  }


  static async update(id, userData) {
    const db = await mongoDatabase.connect();
    const collection = db.collection("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: userData }
    );
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const db = await mongoDatabase.connect();
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Users;