import * as dao from "./dao.js";

const createFollow = async (req, res) => {
  try {
    const { followerId, followeeId } = req.body;
    const follow = await dao.createFollow(followerId, followeeId);
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFollow = async (req, res) => {
  try {
    const { followerId, followeeId } = req.body;
    const result = await dao.deleteFollow(followerId, followeeId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Follow relationship not found." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findFollowersByUserId = async (req, res) => {
  try {
    const followers = await dao.findFollowersByUserId(req.params.userId);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findFolloweesByUserId = async (req, res) => {
  try {
    const followees = await dao.findFolloweesByUserId(req.params.userId);
    res.json(followees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default function FollowerRoutes(app) {
  app.post('/api/follows', createFollow);
  app.delete('/api/follows', deleteFollow);
  app.get('/api/users/:userId/followers', findFollowersByUserId);
  app.get('/api/users/:userId/following', findFolloweesByUserId);
}
