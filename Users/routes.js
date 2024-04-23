import * as dao from "./dao.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = "uploads/";
    fs.mkdir(uploadsDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Failed to create directory:", err);
        cb(err, uploadsDir);
      } else {
        console.log("Uploads directory ensured:", uploadsDir);
        cb(null, uploadsDir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${req.params.userId}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    const updatedUser = await dao.findUserById(user._id);
    req.session["currentUser"] = updatedUser;
    res.json(updatedUser);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };

  const uploadProfilePicture = async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    // Optionally update the user record to reflect the new profile picture path
    dao
      .updateUser(req.params.userId, { profilePicture: req.file.path })
      .then(() => res.send(`File uploaded successfully: ${req.file.path}`))
      .catch((err) =>
        res.status(500).send("Failed to update user with new profile picture.")
      );
  };


  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);

  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post(
    "/api/users/:userId/uploadProfilePicture",
    upload.single("profilePicture"),
    uploadProfilePicture
  );
}
