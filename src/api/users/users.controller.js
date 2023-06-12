const Users = require("./users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userId = await Users.createUser(userData);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const success = await Users.updateUser(req.params.id, req.body);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const success = await Users.deleteUser(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };