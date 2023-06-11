const { getGridFSBucket } = require("../../database/mongo.db");
const { ObjectId } = require("mongodb");
const stream = require('stream');

const saveFileToGridFSBucket = async (file) => {
  const gridFSBucket = await getGridFSBucket(); // Retrieve the GridFSBucket object

  return new Promise((resolve, reject) => {
    const uploadStream = gridFSBucket.openUploadStream(file.originalname);

    uploadStream.once("finish", () => resolve(uploadStream.id));
    uploadStream.once("error", (error) => {
      console.log(error);
      reject(error);
    });

    const fileStream = new stream.PassThrough();
    fileStream.end(file.buffer);

    fileStream.pipe(uploadStream).on("error", (error) => reject(error));
  });
}

const getFileById = async (req, res) => {
  const fileId = new ObjectId(req.params.id); // Convert the ID to an ObjectId
  const gridFSBucket = await getGridFSBucket(); // Retrieve the GridFSBucket object
  const readStream = gridFSBucket.openDownloadStream(fileId);

  readStream.on("error", (err) => {
    console.error("Error retrieving file from GridFS:", err);
    res.sendStatus(404);
  });

  readStream.pipe(res);
};

module.exports = {
  saveFileToGridFSBucket,
  getFileById,
};
