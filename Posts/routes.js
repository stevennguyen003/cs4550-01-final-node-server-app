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

export default function PostRoutes(app) {
  const createPost = async (req, res) => {
    const post = await dao.createPost(req.body);
    const updatedPost = await dao.findPostById(post._id);
    res.json(updatedPost);
  };

  const deletePost = async (req, res) => {
    const status = await dao.deletePost(req.params.postId);
    res.json(status);
  };

  const findAllPosts = async (req, res) => {
    const posts = await dao.findAllPosts();
    res.json(posts);
  };

  const findPostsByAuthor = async (req, res) => {
    const { author } = req.query;
    const posts = await dao.findPostsByAuthor(author);
    res.json(posts);
  };

  const findPostById = async (req, res) => {
    const post = await dao.findPostById(req.params.postId);
    res.json(post);
  };

  const updatePost = async (req, res) => {
    const { postId } = req.params;
    const status = await dao.updatePost(postId, req.body);
    const currentPost = await dao.findPostById(postId);
    res.json(status);
  };
  const uploadImage = async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    dao
      .updatePost(req.params.postId, { image: req.file.path })
      .then(() => res.send(`File uploaded successfully: ${req.file.path}`))
      .catch((err) =>
        res.status(500).send("Failed to update post with image.")
      );
  };

  app.post("/api/posts", createPost);
  app.get("/api/posts", findAllPosts);
  app.get("/api/posts/:postId", findPostById);
  app.put("/api/posts/:postId", updatePost);
  app.delete("/api/posts/:postId", deletePost);
  app.get("/api/posts/:authorId", findPostsByAuthor);
  app.post(
    "/api/posts/:postId/uploadImage",
    upload.single("image"),
    uploadImage
  );
}
