import * as dao from "./dao.js";


export default function CommentRoutes(app) {
  const createComment = async (req, res) => {
    const comment = await dao.createComment(req.body);
    const updateComment = await dao.findCommentById(comment._id);
    res.json(updateComment);
  };

  const deleteComment = async (req, res) => {
    const status = await dao.deleteComment(req.params.commentId);
    res.json(status);
  };

  const findAllComments = async (req, res) => {
    const comments = await dao.findAllComments();
    res.json(comments);
  };


  const findCommentById = async (req, res) => {
    const comment = await dao.findCommentById(req.params.commentId);
    res.json(comment);
  };

  const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const status = await dao.updateComment(commentId, req.body);
    const currentComment = await dao.findCommentById(commentId);
    res.json(status);
  };

  const findCommentsByPost = async (req, res) => {
    const post = req.params.postId;
    const comments = await dao.findCommentsByPost(post);
    res.json(comments);
  };

  app.post("/api/comments", createComment);
  app.get("/api/comments", findAllComments);
  app.get("/api/comments/post/:postId", findCommentsByPost);
  app.get("/api/comments/:commentId", findCommentById);
  app.put("/api/comments/:commentId", updateComment);
  app.delete("/api/comments/:commentId", deleteComment);
  
}
