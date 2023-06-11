const { ObjectId } = require("mongodb");
const mongoDatabase = require("../../database/mongo.db");
const {saveFileToGridFSBucket} = require('../files/files.controller')
const Joi = require("joi");

class Projects {

  static schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).default([]),
    startDate: Joi.date().iso(),
    endDate: Joi.date()
      .iso()
      .when("startDate", {
        is: Joi.exist(),
        then: Joi.date().iso().greater(Joi.ref("startDate")).required(),
        otherwise: Joi.date().iso(),
      }),
  });


  static async getAll() {
    const db = await mongoDatabase.connect();
    return db.collection("projects").find().toArray();
  }

  static async getById(id) {
    const db = await connect();
    return db.collection("projects").findOne({ _id: new ObjectId(id) });
  }

  static async create(projectData, file) {
    const db = await mongoDatabase.connect();
    const collection = db.collection("projects");
    // Save the file to GridFSBucket
    const fileId = await saveFileToGridFSBucket(file);
    // Add the fileId to the projectData
    projectData.fileId = fileId;
    const result = await collection.insertOne(projectData);

    // Fetch the inserted document from the database
    const insertedDocument = await collection.findOne({
      _id: result.insertedId,
    });

    return insertedDocument;
  }

  static async update(id, project) {
    const db = await mongoDatabase.connect();

    const result = await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(id) }, { $set: project });
    return result.modifiedCount > 0;
  }

  static async delete(id) {
    const db = await mongoDatabase.connect();
    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

module.exports = Projects;
