import * as dao from './dao.js'; 

export default function FriendRoutes(app) {
  const createFriendRequest = async (req, res) => {
    try {
      const friendRequest = await dao.createFriendRequest(req.body.requesterId, req.body.recipientId);
      res.status(201).json(friendRequest);
    } catch (error) {
      res.status(500).json({ message: "Failed to create friend request", error });
    }
  };

  const updateFriendRequest = async (req, res) => {
    try {
      const { requesterId, recipientId } = req.params;
      const status = req.body.status;
      const result = await dao.updateFriendRequest(requesterId, recipientId, status);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to update friend request", error });
    }
  };

  const findAllFriendRequestsByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const requests = await dao.findAllFriendRequestsByUser(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve friend requests", error });
    }
  };

  const deleteFriendRequest = async (req, res) => {
    try {
      const { requesterId, recipientId } = req.params;
      await dao.deleteFriendRequest(requesterId, recipientId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete friend request", error });
    }
  };

  const findPendingRequestsToUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const pendingRequests = await dao.findPendingRequestsToUser(userId);
      res.json(pendingRequests);
    } catch (error) {
      res.status(500).json({ message: "Failed to find pending requests", error });
    }
  };

  // ?
  app.get('/api/friends/myfriends', async (req, res) => {
    try {
        const userId = req.user._id; 
        const friends = await findAllFriendRequestsByUser(userId);
        res.json(friends);
    } catch (error) {
        res.status(500).json({ message: "Failed to get friends list", error });
    }
});

app.get("/api/users/search", async (req, res) => {
  const { query } = req.query;
  try {
    const users = await dao.searchUsers(query);
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Error searching for users", error });
  }
});

  app.post("/api/friends", createFriendRequest);
  app.put("/api/friends/:requesterId/:recipientId", updateFriendRequest);
  app.get("/api/friends/:userId", findAllFriendRequestsByUser);
  app.delete("/api/friends/:requesterId/:recipientId", deleteFriendRequest);
  app.get("/api/friends/pending/:userId", findPendingRequestsToUser);
}
